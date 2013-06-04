---
layout: post
title: "Creating Integration Tests in Apache Sling"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-06-04/creating-integration-tests-apache-sling
summary: ""
tags: [Apache Sling, Integration Testing, jUnit]
---

One of the lesser known features in Apache Sling Testing Tools framework is the [SlingTestBase](https://svn.apache.org/repos/asf/sling/trunk/testing/tools/src/main/java/org/apache/sling/testing/tools/sling/SlingTestBase.java), this class can be extended to allow you to create tests against a Sling instance which will be automatically created, started and then shut down when the tests are complete.  

There are other methods for invoking integration tests in Apache Sling, such as the [jUnit Remote Tests](http://sling.apache.org/documentation/development/sling-testing-tools.html#server-side-junit-tests-contributed-by-bundles), however these tests require you to install testing code into the repository and are not easily automatically tested.  The SlingTestBase allows you to create tests where the code is not installed and which automatically run with your build, once the code is compiled and packaged.

Creating an Integration Test

The process of creating integration tests using the SlingTestBase begins with updating your POM.  First you will need to add the following plugins:


	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-dependency-plugin</artifactId>
		<executions>
			<execution>
				<id>copy-runnable-jar</id>
				<goals>
					<goal>copy-dependencies</goal>
				</goals>
				<phase>package</phase>
				<configuration>
					<outputDirectory>${project.build.directory}/sling</outputDirectory>
					<includeArtifactIds>org.apache.sling.launchpad</includeArtifactIds>
					<excludeTransitive>true</excludeTransitive>
					<overWriteReleases>false</overWriteReleases>
					<overWriteSnapshots>false</overWriteSnapshots>
				</configuration>
			</execution>
			<execution>
				<id>copy-dependencies</id>
				<goals>
					<goal>copy-dependencies</goal>
				</goals>
				<phase>package</phase>
				<configuration>
					<outputDirectory>${project.build.directory}/sling/additional-bundles</outputDirectory>
					<!-- Include artifact id's of all of the bundles to install here -->
					<includeArtifactIds>jstl</includeArtifactIds>
					<excludeTransitive>true</excludeTransitive>
					<overWriteReleases>false</overWriteReleases>
					<overWriteSnapshots>false</overWriteSnapshots>
				</configuration>
			</execution>
		</executions>
	</plugin>
	
The Maven Dependency plugin will copy the bundles you need to install for your integration tests from your local Maven Repository to the filesystem.  Additionally, the first execution 'copy-runnable-jar' will copy the Sling Launchpad jar into your target directory so it can be executed.

	<plugin>
		<artifactId>maven-antrun-plugin</artifactId>
		<executions>
			<execution>
				<phase>package</phase>
				<configuration>
					<tasks>
						<copy
							file="${project.build.directory}/${project.build.finalName}.jar"
							toDir="${project.build.directory}/sling/additional-bundles"
							verbose="true" />
					</tasks>
				</configuration>
				<goals>
					<goal>run</goal>
				</goals>
			</execution>
		</executions>
	</plugin>
	
The AntRun Plugin used to copy the output of the  built into the additional-bundles folder to be installed into the Sling testing instance when it starts.  If your integration tests are part of a separate testing project this will not be required.

	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-failsafe-plugin</artifactId>
		<version>2.12.4</version>
		<executions>
			<execution>
				<id>integration-test</id>
				<goals>
					<goal>integration-test</goal>
				</goals>
			</execution>
		</executions>
		<configuration>
			<includes>
				<include>**/*IT.java</include>
			</includes>
			<systemPropertyVariables>
				<jar.executor.work.folder>${project.build.directory}/sling</jar.executor.work.folder>
				<jar.executor.jar.options>-p $JAREXEC_SERVER_PORT$</jar.executor.jar.options>
				<jar.executor.vm.options>-Xmx512m</jar.executor.vm.options>
				<jar.executor.jar.folder>${project.build.directory}/sling</jar.executor.jar.folder>
				<jar.executor.jar.name.regexp>org.apache.sling.launchpad.*jar$</jar.executor.jar.name.regexp>
				<additional.bundles.path>${project.build.directory}/sling/additional-bundles</additional.bundles.path>
				<keepJarRunning>false</keepJarRunning>
				<server.ready.timeout.seconds>60</server.ready.timeout.seconds>
				<sling.testing.timeout.multiplier>1.0</sling.testing.timeout.multiplier>
				<server.ready.path.1>/:script src="system/sling.js"</server.ready.path.1>
				<start.bundles.timeout.seconds>30</start.bundles.timeout.seconds>
				<bundle.install.timeout.seconds>20</bundle.install.timeout.seconds>
				<!-- Define additional bundles to install by specifying the beginning 
					of their artifact name. The bundles are installed in lexical order of these 
					property names. All bundles must be listed as dependencies in this pom, or 
					they won't be installed. -->
				<sling.additional.bundle.1>sample-sling-integration-test</sling.additional.bundle.1>
				<sling.additional.bundle.2>jstl</sling.additional.bundle.2>
			</systemPropertyVariables>
		</configuration>
	</plugin>

The Maven Failsafe plugin defines all of the properties and runs the tests.  Note that the bundles to install must be defined here as well.  The properties used to configure the SlingTestBase are:

### SlingTestBase Properties

* test.server.url - The url for server, only needed if using an already running instance and the test.server.hostname is not set
* test.server.username - The username to use for the server, only needed if using an already running instance
* test.server.password - The password to use for the server, only needed if using an already running instance
* server.ready.timeout.seconds - The number of seconds to wait before checking if the server is ready.
* server.ready.path.[num] - A list of paths to check if the server is ready
* keepJarRunning - A flag of whether or not to shutdown the server when complete, generally used if the server should already be running
* test.server.hostname - The test server hostname
* additional.bundles.path - The path to the additional bundles to install once the Sling instance is started
* sling.additional.bundle.[num] - The artifact id's of the additional bundles to install
* start.bundles.timeout.seconds - The timeout to wait for a bundle to start, depending on the performance of your system this may need to change
* bundle.install.timeout.seconds - The timeout to wait for a bundle to install, again this may need to change depending on the performance of your system

### JarRunner Properties
	
* jar.executor.server.port - The server port on which the jar will be started
* jar.executor.jar.folder - The folder containing the jar to run
* jar.executor.jar.name.regexp - a regular expression for finding the name of the jar to run, the first jar in the jar folder matching this pattern will be executed
* jar.executor.vm.options - Options to pass to the VM when executing the jar
* jar.executor.work.folder - The 
 public static final String PROP_JAR_OPTIONS = "jar.executor.jar.options"