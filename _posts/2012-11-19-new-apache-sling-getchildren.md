---
layout: post
title: "New in Apache Sling: getChildren"
original: http://labs.sixdimensions.com/blog/dan-klco/2012-11-19/new-apache-sling-getchildren
summary: "Introducing a new method in the Sling Resource class: getChildren"
tags: [Adobe CQ, Apache Sling, Open Source]
thumbnail: /images/posts/shared/sling.jpeg
---


Recently I had the pleasure of contributing to the Apache Sling project.&nbsp; Among other things, I contributed a suggested improvement to have Sling Resources return an Iterable of the child resources.&nbsp; Recently, the Apache Sling [released an update](http://sling.apache.org/site/news.html) to the Sling API,&nbsp; including an implementation of this improvement.&nbsp; With the new API change, developers will be able to leverage the enhanced for-each loops available in Java 6.&nbsp;

This will allow developers to write code like:

	for(Resource child : resource.getChildren(){
		[... do something ...]
	}

Which is more consise and readable than the old style using an Iterator:

	Iterator<Resource> children = resource.listChildren();
	while(children.hasNext()){
		Resource child = children.next();
		[... do something ...]
	}

Additionally, since the new method name is JavaBean compliant, you can now use JSTL and Expression Language to access the child resources.

	<c:forEach var="child" items="${resource.children}">
		<!-- Do Something -->
	</c:forEach>

Unfortunately, since this is a bleeding edge change, it's going to take awhile to trickle down into the implementers of Apache Sling, such as Adobe CQ.&nbsp; Hopefully, one of the upcoming releases of Adobe CQ, maybe even the upcoming CQ 5.6, will implement Apache Sling API 2.3.0, which contains this improvement.

*Update:* Adobe CQ 5.6 Contains this API change.  