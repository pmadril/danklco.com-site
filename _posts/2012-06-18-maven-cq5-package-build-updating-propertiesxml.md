---
layout: post
title: "Maven CQ5 Package Build: Updating Properties.xml"
original: http://labs.sixdimensions.com/blog/dklco/2012-06-19/maven-cq5-package-build-updating-propertiesxml
summary: Shows how to update the VLT Properties.xml in a Maven Build
tags: [Adobe CQ, Apache Maven, How To]
---

This article describes the process of adding and automatically updating a CQ5 Package properties.xml as a part of a Maven build.

## Why do I need a Properties.xml?

Certain CQ5.4 Hotfixes are known to cause issues where packages without a properties.xml will not install properly.&nbsp; If you attempt to install a package into a CQ instance with the affected Hotfix, you will see this error:

    java.lang.NullPointerException
    at com.day.jcr.vault.packaging.impl.InstallHookProcessor.registerHooks(InstallHookProcessor.java:80)
    at com.day.jcr.vault.packaging.impl.ZipVaultPackage.prepareExtract(ZipVaultPackage.java:303)
    at com.day.jcr.vault.packaging.impl.JcrPackageImpl.extract(JcrPackageImpl.java:341)
    at com.day.jcr.vault.packaging.impl.JcrPackageImpl.install(JcrPackageImpl.java:314)
    at com.day.crx.packaging.impl.J2EEPackageManager.consoleInstall(J2EEPackageManager.java:304)
    at com.day.crx.packaging.impl.J2EEPackageManager.doPost(J2EEPackageManager.java:152)
    at com.day.crx.packaging.impl.PackageManagerServlet.doPost(PackageManagerServlet.java:73)
    at com.day.crx.j2ee.CRXHttpServlet.doPost(CRXHttpServlet.java:127)

Adobe recommends you contact support regarding this issue.&nbsp; You can read more about which hotfixes may be affected in the [Knowledge Base][1].

If you cannot otherwise resolve the issue, the easiest course is to add the properties.xml into the package as part of your build.&nbsp;

## Adding the Properties.xml

The first step to adding the properties.xml is to create the file in your META-INF/vault directory.&nbsp; This will be the same directory containing the filter.xml.

By default, the properties.xml contains state information we don't want persisted into source control, such as what user last installed the package and how many times it has been built.&nbsp; The stripped down properties.xml contains the information needed to install the package, but nothing more:

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
    <properties>
        <comment>FileVault Package Properties</comment>
        <entry key="name">{PROJECT_NAME}</entry>
        <entry key="version">PROJECT_VERSION</entry>
        <entry key="dependencies" />
        <entry key="packageFormatVersion">2</entry>
        <entry key="group">{PROJECT_GROUP}</entry>
    </properties>

Next, replace the {PROJECT\_NAME} and {PROJECT\_GROUP} placeholders with the appropriate values for your package.&nbsp; Leave the PROJECT_VERSION placeholder as is.

## Updating the Package Version

Since we're using Maven to build the package automatically, we will need to update the package version automatically. Otherwise, we'd will have to manually keep it in sync with the version in the POM, which leaves plenty of room for errors.&nbsp;

Luckily, there is a Maven plugin called [Maven Replacer Plugin][2] for just this purpose.&nbsp; Add the plugin configuration below to have Maven automatically update the package version with every build.&nbsp;

    <plugin>
        <groupId>com.google.code.maven-replacer-plugin</groupId>
        <artifactId>replacer</artifactId>
        <version>1.5.0</version>
        <executions>
            <execution>
                <phase>prepare-package</phase>
                <goals>
                    <goal>replace</goal>
                </goals>
            </execution>
        </executions>
        <configuration>
            <file>target/classes/META-INF/vault/properties.xml</file>
            <replacements>
                <replacement>
                    <token>PROJECT_VERSION</token>
                    <value>${project.version}</value>
                </replacement>
            </replacements>
        </configuration>
    </plugin>

Once you have all of these steps complete you should be able to install your Maven built plugin into systems affected by the Hotfix issues.

 [1]: http://dev.day.com/content/kb/home/Crx/Hotfixes/crx-2-2/hotfixpack.html "Adobe CQ Knowledge Base"
 [2]: http://code.google.com/p/maven-replacer-plugin/ "Maven Replacer Plugin"  