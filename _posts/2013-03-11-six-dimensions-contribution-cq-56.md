---
layout: post
title: "Six Dimensions' Contribution to CQ 5.6"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-03-11/six-dimensions-contribution-cq-56
summary: "Introducing Six Dimensions' contribution to CQ 5.6"
tags: [Servlet, Apache Sling, Gotcha, Apache Maven]
thumbnail: /images/posts/shared/sling.jpeg
---

The new version of CQ5,&nbsp;[Adobe Experience Manager 5.6](http://www.adobe.com/solutions/web-experience-management.html "Adobe Experience Manager"), includes a contribution by Six Dimensions to the [Apache Sling](http://sling.apache.org/ "Apache Sling") project. &nbsp;This contribution adds a new method, [getChildren](http://dev.day.com/docs/en/cq/current/javadoc/org/apache/sling/api/resource/Resource.html#getChildren%28%29) to the Resource interface. &nbsp;

> Now getChildren() in the Resource-API, available in AEM5.6 thanks to @[klcodanr](https://twitter.com/klcodanr) [#sling](https://twitter.com/search/%23sling) [#cq5](https://twitter.com/search/%23cq5) [#aem](https://twitter.com/search/%23aem) [dev.day.com/docs/en/cq/cur...](http://t.co/b9r1H1nD42 "http://dev.day.com/docs/en/cq/current/javadoc/org/apache/sling/api/resource/Resource.html")
> 
> &mdash; Feike Visser (@heervisscher) [March 10, 2013](https://twitter.com/heervisscher/status/310668296523501568)

This method allows you to use for-each loops to iterate through child resources and allows access the children of a resource using Expression Language and TagLibs. &nbsp;For more information on this API change, please read [New in Apache Sling: getChildren](http://labs.sixdimensions.com/blog/dan-klco/2012-11-19/new-apache-sling-getchildren).