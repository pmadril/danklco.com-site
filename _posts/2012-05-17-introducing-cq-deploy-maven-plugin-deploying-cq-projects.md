---
layout: post
title: "Introducing CQ Deploy: A Maven Plugin for Deploying CQ Projects"
original: http://labs.sixdimensions.com/blog/dklco/2012-05-03/introducing-cq-deploy-maven-plugin-deploying-cq-projects
summary: "Introducing CQ Deploy: A Maven Plugin for Deploying CQ Projects"
tags: [Adobe CQ, Apache Maven]
---

The Six Dimensions Labs team is proud to introduce CQ Deploy, an [Apache Maven][1] plugin for deploying Maven projects into Adobe CQ repositories.

The CQ Deploy plugin provides two goals, to help developers deploy Maven projects:

*   install-package   
    *This goal is used to install CQ Packages into CQ Repositories.*
*   install-bundle   
    *This gloal is used to install bundles into CQ Repositories.&nbsp; This goal is different from the [Maven Sling Plugin][2]'s deploy method.&nbsp; Whereas the Maven Sling Plugin installs the bundle directly into the Felix application, the CQ Deploy plugin is used to upload the JAR into the CQ Application install folder and the path thereof can be configured.*

As the plugin deploys both Packages and Bundles in a consistant method, developers can use the CQ Deploy plugin to create a single, unified package for deploying a CQ Application, including JSP and Bundle code.&nbsp;

As the CQ Deploy plugin has been deployed into the Maven Central Repository, it can be used on projects, by simply invoking the plugin in your POM.&nbsp; To use the CQ Deploy Plugin in a bundle project add the following into your POM file.&nbsp; This will install the primary JAR file generated in the build process into a CQ Server running on http://localhost:4502, using the username/password combination admin/admin under the path: /apps/bundles/install.

     <build>
        <plugins>
            <plugin>
                <groupId>com.sixdimensions.wcm.cq</groupId>
                <artifactId>cq-deploy-plugin</artifactId>
                <version>0.0.4</version>
                <executions>
                    <execution>
                        <id>install-bundle</id>
                        <goals>
                            <goal>install-bundle</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    [...]
                </configuration>
            </plugin> 

To use the CQ Deploy Plugin in a package project add the following into your POM file.&nbsp; This will install the primary JAR file generated in the build process into the CQ Package Manager of a CQ Server running on http://localhost:4502, using the username/password combination admin/admin.

     <build>
        <plugins>
            <plugin>
                <groupId>com.sixdimensions.wcm.cq</groupId>
                <artifactId>cq-deploy-plugin</artifactId>
                <version>0.0.4</version>
                <executions>
                    <execution>
                        <id>install-package</id>
                        <goals>
                            <goal>install-package</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    [...]
                </configuration>
            </plugin>

The CQ Deploy plugin offers a number of configuration values to change where the files are deployed and by what user.&nbsp; To read more about the CQ Deploy plugin, consult the [CQ Deploy Plugin Documentation Site][3].

To report any issues, or ask any questions, please [create an issue][4].

 [1]: http://maven.apache.org/
 [2]: http://sling.apache.org/site/sling.html
 [3]: http://sixdimensions.github.com/cq-deploy-plugin/
 [4]: https://github.com/SixDimensions/cq-deploy-plugin/issues  