---
layout: post
title: "New in CQ 5.5: Dependency Finder"
original: http://labs.sixdimensions.com/blog/dklco/2012-05-04/new-cq-55-dependency-finder
summary: Introduction to the new Dependency finder, available in Adobe CQ5.
tags: [Adobe CQ, CQ 5.5, Apache Maven]
thumbnail: /images/posts/2012-05-04-new-cq-55-dependency-finder/DependencyFinderResults.png
---

Adobe just released CQ 5.5, the latest version of their flagship enterprise Web Experience Management product.  Along with a new UI, numerous speed and stability fixes and deeper integrations with Adobe's other products, CQ 5.5 comes with some new tools to make using and developing on CQ easier.

One of the new tools is the Dependency Finder, which comes shipped in the Apache Felix console.  This tool can be very useful to developers to find the dependency information they need to add into their Maven POM or figure out which Bundle contains a particular class or package.  To load the Dependency Finder, login to: {HOST}/system/console/depfinder

![Screenshot of the Dependency Finder][1]

The Dependency Finder has only one field.  In it, enter the packages or class names you want to find, separating each item with a new line.  The package must be an exported package, it will not retrieve child or parent packages.  So for example, if you wanted to find the CQ WCM API package, you would have to enter 'com.day.cq.wcm.api', not 'com.day.cq'.

Once you enter your packages and click find, the Dependency Finder will search against the Bundles loaded into the OSGi Console for bundles exporting the packages you specified.  It will return a list of the Bundles corresponding with each package or class as well as the Maven dependencies to import the packages into your Maven project.

![Screenshot of the Dependency Finder Results][2]

You can use the links to the bundles to manage the bundles or add the Maven dependencies right into your POM.

 [1]: /images/posts/2012-05-04-new-cq-55-dependency-finder/DependencyFinder.png "Screenshot of the Dependency Finder"
 [2]: /images/posts/2012-05-04-new-cq-55-dependency-finder/DependencyFinderResults.png "Screenshot of the Dependency Finder Results"  