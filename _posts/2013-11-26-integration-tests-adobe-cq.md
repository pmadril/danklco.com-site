---
layout: post
title: "Integration Tests in Adobe CQ"
summary: ""
original: 
tags: [Adobe CQ, Best Practices]
---

Awhile back I wrote a post on running [integration tests in Apache Sling](http://labs.sixdimensions.com/blog/dan-klco/2013-06-05/creating-integration-tests-apache-sling).  This technique is useful for developers working directly on Apache Sling, but doesn't support downstream platforms like Adobe CQ/AEM.

After some finagling and testing I was able to get a similar technique working using Adobe CQ / AEM instead of Apache Sling.  To enable integration tests using Adobe CQ, add the following into your POM.

First, add plugins to copy required dependencies and the current project output into the CQ instance:

    <!-- Copy the required dependencies -->
    <plugin>
         <groupId>org.apache.maven.plugins</groupId>
         <artifactId>maven-dependency-plugin</artifactId>
         <executions>
             <execution>
                  <id>copy-dependencies</id>
                  <goals>
                      <goal>copy-dependencies</goal>
                  </goals>
                  <phase>package</phase>
                  <configuration>
                  	  <outputDirectory>${project.build.directory}/sling/additional-bundles</outputDirectory>
                  	  <includeArtifactIds>artifact-id-1,artifact-id-2</includeArtifactIds>
                  	  <excludeTransitive>true</excludeTransitive>
                      <overWriteReleases>false</overWriteReleases>
                      <overWriteSnapshots>false</overWriteSnapshots>
                  </configuration>
              </execution>
         </executions>
    </plugin>
    <plugin>
         <artifactId>maven-antrun-plugin</artifactId>
         <executions>
         <execution>
                                                <phase>package</phase>
                                                <configuration>
                                                        <tasks>
                                                                <copy file="${project.build.directory}/${project.build.finalName}.jar" toDir="${project.build.directory}/sling/additional-bundles" verbose="true" />
                                                        </tasks>
                                                </configuration>
                                                <goals>
                                                        <goal>run</goal>
                                                </goals>
                                        </execution>
                                </executions>
                        </plugin>
