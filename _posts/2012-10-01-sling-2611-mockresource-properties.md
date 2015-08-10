---
layout: post
title: "[SLING-2611] MockResource Properties"
summary: "Learn about the new properties available on the Apache Sling Commons Testing's Mock Resource"
tags: [Apache Sling, Patch, Open Source]
thumbnail: /images/posts/shared/sling.jpeg
---

I recently [submitted a patch][1] to the Apache Sling project.  This patch includes new functionality for Commons Testing's MockResource class.  The patch adds two methods:

* addProperty - add a single key, value set 
* getProperties - returns the map of properties which can be modified 

These methods allow developers to set arbitrary properties on a MockResource and then when the MockResource is adapted to a ValueMap, the ValueMap will contain these properties.

[1]: https://issues.apache.org/jira/browse/SLING-2611