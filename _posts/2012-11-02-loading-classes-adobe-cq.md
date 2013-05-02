---
layout: post
title: "Loading Classes in Adobe CQ"
original: http://labs.sixdimensions.com/blog/dan-klco/2012-11-02/loading-classes-adobe-cq
summary: "Learn how to dynamically load classes in Adobe CQ"
tags: [Adobe CQ, Apache Sling, ClassLoader]
---

So you've got a problem. &nbsp;You need to load a resource from the Classpath or you need to dynamically load a class and you're using Adobe CQ. &nbsp;Since Adobe CQ uses an OSGi container, a regular [ClassLoader][1] will not be able to retrieve the class information from the OSGi Bundles.

Never fear, Apache Sling provides the [Dynamic ClassLoader Service][2].&nbsp; This OSGi Service allows you to retrieve a ClassLoader which will allow you to interact with classes contained in OSGi Bundles.

### Using the Service

Using the service is easy, simply retrieve an instance of the service [org.apache.sling.commons.classloader.DynamicClassLoaderManager][3] and call the method [getDynamicClassLoader()][4].

In JSP scripts, you can simply use the [Sling Script Helper][5]:

	<%
	  DynamicClassLoaderManager classLoaderManager = sling.getService(DynamicClassLoaderManager.class);
	  ClassLoader classLoader = classLoaderManager.getDynamicClassLoader();
	  [... Use the ClassLoader ...]
	%>

OSGi Services can just use a Reference to load the DynamicClassLoaderManager

	@Reference
	private DynamicClassLoaderManager classLoaderManager;

Tags need to first retrieve the SlingBindings and then retrieve the Script Helper to get the DynamicClassLoaderManager.

	final SlingBindings bindings = (SlingBindings) pageContext.getRequest()
		.getAttribute(SlingBindings.class.getName());
	final SlingScriptHelper scriptHelper = bindings.getSling();
	final DynamicClassLoaderManager dynamicClassLoaderManager = 
		scriptHelper.getService(DynamicClassLoaderManager.class);

Once you have the ClassLoader, it can be used like any other ClassLoader to retrieve resources from the Classpath or dynamically retrieve Classes.

&nbsp;

 [1]: http://docs.oracle.com/javase/6/docs/api/java/lang/ClassLoader.html
 [2]: http://sling.apache.org/apidocs/sling6/org/apache/sling/commons/classloader/package-summary.html
 [3]: http://sling.apache.org/apidocs/sling6/org/apache/sling/commons/classloader/DynamicClassLoaderManager.html
 [4]: http://sling.apache.org/apidocs/sling6/org/apache/sling/commons/classloader/DynamicClassLoaderManager.html#getDynamicClassLoader%28%29
 [5]: http://sling.apache.org/apidocs/sling6/org/apache/sling/scripting/core/ScriptHelper.html  