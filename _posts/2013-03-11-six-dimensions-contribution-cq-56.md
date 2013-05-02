---
layout: post
title: "Six Dimensions' Contribution to CQ 5.6"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-03-11/six-dimensions-contribution-cq-56
summary: "Introducing Six Dimensions' contribution to CQ 5.6"
tags: [Servlet, Apache Sling, Gotcha, Apache Maven]
---

The new version of CQ5,&nbsp;[Adobe Experience Manager 5.6][1], includes a contribution by Six Dimensions to the [Apache Sling][2]&nbsp;project. &nbsp;This contribution adds a new method, [getChildren][3] to the Resource interface. &nbsp;

> Now getChildren() in the Resource-API, available in AEM5.6 thanks to @[klcodanr][4] [#sling][5] [#cq5][6] [#aem][7] [dev.day.com/docs/en/cq/cur...][8]
> 
> &mdash Feike Visser (@heervisscher) [March 10, 2013][9]

This method allows you to use for-each loops to iterate through child resources and allows access the children of a resource using Expression Language and TagLibs. &nbsp;For more information on this API change, please read [New in Apache Sling: getChildren][10].

 [1]: http://www.adobe.com/solutions/web-experience-management.html "Adobe Experience Manager"
 [2]: http://sling.apache.org/ "Apache Sling"
 [3]: http://dev.day.com/docs/en/cq/current/javadoc/org/apache/sling/api/resource/Resource.html#getChildren%28%29 "Adobe CQ Documentation for getChildren"
 [4]: https://twitter.com/klcodanr
 [5]: https://twitter.com/search/%23sling
 [6]: https://twitter.com/search/%23cq5
 [7]: https://twitter.com/search/%23aem
 [8]: http://t.co/b9r1H1nD42 "http://dev.day.com/docs/en/cq/current/javadoc/org/apache/sling/api/resource/Resource.html"
 [9]: https://twitter.com/heervisscher/status/310668296523501568
 [10]: http://labs.sixdimensions.com/blog/dan-klco/2012-11-19/new-apache-sling-getchildren  