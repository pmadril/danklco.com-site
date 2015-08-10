---
layout: post
title: "Sling (sort of) Requires Javax Servlet"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-02-13/sling-sort-requires-javax-servlet
summary: "Find out how to resolve a missing javax.servlet dependency when using the Apache Sling API."
tags: [Servlet, Apache Sling, Gotcha, Apache Maven]
thumbnail: /images/posts/shared/sling.jpeg
---

Recently I was refactoring some Maven POM's to reduce the number of dependencies and manage the dependency version from the reactor POM.&nbsp;&nbsp; After I removed the duplicate dependencies&nbsp;I ran the build and almost immediately ran into this error:

    [ERROR] BUILD FAILURE  
    [INFO] ------------------------------------------------------------------------  
    [INFO] Compilation failure  
    {...Class}.java:[178,50] cannot access javax.servlet.http.HttpServletRequest class file for javax.servlet.http.HttpServletRequest not found
			RequestPathInfo requestInfo = httpRequest.getRequestPathInfo() ;

Since the error was related to Java Servlets, I assumed it was an issue with the servlet project.&nbsp; After spending time going down the rabbit hole, I noticed the error was actually coming out of another project, and being triggered by a [Sling Pipeline Rewriter][1].

So why would code which isn't a servlet code be throwing an error for missing a javax.servlet class?&nbsp; Well, the error is triggered by:

	RequestPathInfo requestInfo = context.getRequest().getRequestPathInfo();

Well, it turns out that the Sling API declares the Java Servlet API as a provided dependency, meaning it's included in the compilation of the Sling API, but not transitive.&nbsp; The simple solution is that if you interact with any of the Sling Servlet code, aka the [SlingHttpServletRequest][2] or the [SlingHttpServletResponse][3], you need to add the [javax.servlet.servlet-api][4] as a dependency in your project.

 [1]: http://sling.apache.org/site/output-rewriting-pipelines-orgapacheslingrewriter.html "Apache Sling Rewriting Pipeline"
 [2]: http://sling.apache.org/apidocs/sling6/org/apache/sling/api/SlingHttpServletRequest.html "SlingHttpServletRequest JavaDocs"
 [3]: http://sling.apache.org/apidocs/sling6/org/apache/sling/api/SlingHttpServletResponse.html "SlingHttpServletResponse JavaDocs"
 [4]: http://search.maven.org/#artifactdetails|javax.servlet|servlet-api|2.4|jar "Java Servlet API"  