---
layout: post
title: "Service Boss Level: Service Factories"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-08-27/service-boss-level-service-factories
summary: "Discusses the process for creating a Sling Service Factory"
tags: [Adobe CQ, Apache Felix, Apache Sling, OSGi]
thumbnail: /images/posts/2013-08-27-service-boss-level-service-factories/sling-logging-service-factory.png
---


# Service Boss Level: Service Factories

I've always wondered how the&nbsp;Apache Sling Logging Logger Configuration worked. &nbsp;I like the idea of being able to configure multiple configuration instances through the OSGi Console and could see how this would cut down on the UI code I'd need to write in many circumstances.

Since working on the&nbsp;[Apache Sling][1]&nbsp;project, I have taken the time to peruse the code for the Sling logger. &nbsp;Unfortunately, the Sling logging code uses a fairly arcane method for registering the service. &nbsp;After looking around a bit, I took a look at the code for the Apache Sling Job Queue Configuration, which was much easier to follow.

<img src="/images/posts/2013-08-27-service-boss-level-service-factories/sling-logging-service-factory.png" alt="The Sling Logger Service Configuration Factory" class="img-responsive" />
_The Sling Logger Configuration Screen_

It turns out creating, factory was easer than I suspected. &nbsp;The solution is to simply add the following attributes to your `@Component` annotation:

  * `configurationFactory=true`
  * `policy=ConfigurationPolicy.REQUIRE`

That's it! &nbsp;Once you load the bundle for your component you will see a new component factory on the configuration page with your component label. &nbsp;The form generated will be based on the `@Property` annotations on your component class, just like a regular service.

So how do you use the configuration instances from your service factory? &nbsp;Well you could query Felix every time you need the configurations or can use a [ServiceTracker][2]&nbsp;which allows you to react to services being registered and update a cache. &nbsp;Probably the easiest option, however would be to set the component to start automatically by adding the `immediate=true` attribute to the `@Component` annotation and updating a separate configuration cache service in the activate and deactivate methods for your service.

Since these methods will be called when the service is stopped or started including creation and the start/stop of the console, you can keep the cache in sync with any of the changes of the configuration services.

Hopefully this article has helped you see how easy it is to create Sling Service Factories and gives you another tool to enhance the administrative capabilities of the OSGi console and avoid creating configuration pages.

   [1]: http://sling.apache.org/ (Apache Sling)
   [2]: http://www.osgi.org/javadoc/r4v42/org/osgi/util/tracker/ServiceTracker.html
  