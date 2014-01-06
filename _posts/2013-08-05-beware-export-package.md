---
layout: post
title: "Beware of Export-Package"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-08-05/beware-export-package
summary: "Illustrates why you need to be careful with the Export-Package instruction and in general when setting up a project."
tags: [Adobe CQ, Apache Felix, Apache Sling, Best Practices, SOAP Web Services]
---

Quick &mdash; without checking the documentation, what does the Export-Package instruction do in the [Maven Bundle Plugin](http://felix.apache.org/site/apache-felix-maven-bundle-plugin-bnd.html)?

Did you say "sets what packages are exported by the bundle"? &nbsp;If so, you're only half right.

Recently, I was trying to diagnose some issues with a SOAP Web Services implementation in an existing code base. &nbsp; Theoretically, everything was in place, however I was getting a `ClassCastException` when attempting to retrieve the OSGi Service for accessing the SOAP Web Service. &nbsp;After staring at the logs and pulling out clumps of hair, I decided to find out where each class was coming from. &nbsp;

I executed the code below to get the source of the service interface class as well as the interface class implemented by the service implementation.


    log.info(Service.class.getProtectionDomain().getCodeSource().getLocation());
    log.info(ServiceImpl.class.getInterfaces()[0].getProtectionDomain().getCodeSource().getLocation());

Shockingly, even though the interface for the ServiceImpl and the Service interface are the same class, the two class instances were loaded from separate bundles! &nbsp;It turns out what was happening is that the existing project set the export directive to: `com.client.*`.

In addition to setting the packages exported by the bundle, the Export-Package instruction will actually copy all of the classes matching the specified package from the bundle classpath into the current bundle. &nbsp; This is some powerful functionality, but can be easily misused. &nbsp;Since the Service was referenced from another bundle which used the above mentioned Export-Package instruction, all of the service code was duplicated from the service into the consuming bundle. &nbsp;As there was two copies of the classes, the ClassLoader didn't believe that the Service interface and the interface the Service Implementation implemented were the same class. &nbsp;The fix for the problem was simply to remove the Export-Package instruction from the consuming bundle's POM file. &nbsp;

Which brings me back to my original point, the Export-Package instruction can be very dangerous and can cause unexpected side-effects. Like any other tool, it can be useful, but you need to be careful and fully understand the effects when using the Export-Package instruction. &nbsp;

Quite likely, this project's POM was copied from another project without the author really understanding what the POM is doing. &nbsp;It's important, especially when creating a new project, to ensure you're not just blindly copying, but instead truly comprehending every configuration in the project's POM.