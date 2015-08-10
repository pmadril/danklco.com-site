---
lawyout: post
title: "Six Dimensions Supports the Apache Sling Project: Resource.hasChildren"
summary: "Learn about Six Dimensions' recent contribution to the Sling API of a new hasChildren method"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-11-18/six-dimensions-supports-apache-sling-project-resourcehaschildren
tags: [Adobe CQ, Apache Sling, Best Practices, Open Source Contribution]
thumbnail: /images/posts/shared/sling.jpeg
---

Recently, I had the chance to shepherd a [new feature](https://issues.apache.org/jira/browse/SLING-3213) into the Apache Sling API.  This feature adds the method `hasChildren` to the [`Resource`](http://sling.apache.org/apidocs/sling6/org/apache/sling/api/resource/Resource.html) and [`ResourceResolver`](http://sling.apache.org/apidocs/sling6/org/apache/sling/api/resource/ResourceResolver.html).  My colleague, [Brian Warner](https://twitter.com/Brian_A_Warner) suggested adding this method after struggling to do this in a clean, correct way.

What's new? The hasChildren method is a convenient shortcut for developers to check whether or not a Resource has child resources.  This method returns correctly across different Resource Providers unlike the lower-level API's such as [`Node.hasNodes()`](http://www.day.com/maven/javax.jcr/javadocs/jcr-1.0/javax/jcr/Node.html).  And this method enables developers to check for child Resources easily and intuitively, for example:

	if(resource.hasChildren()){
		// DO SOMETHING
	}

The feature has been added into the Sling codebase, but there is not yet a new release of the Sling API, but this feature will likely make it into CQ6 and I will update this post once the new method becomes available.