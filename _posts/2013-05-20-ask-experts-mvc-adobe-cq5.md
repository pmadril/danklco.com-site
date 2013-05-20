---
layout: post
title: "Ask the Experts: MVC in Adobe CQ5"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-05-20/ask-experts-mvc-adobe-cq5
summary: "Answers from experts on how MVC is implemented in Adobe CQ5"
tags: [Adobe CQ, Development, CQ Deploy, Apache Maven]
---

In this series of blog posts we pose a question to experts in the Adobe CQ5 platform about Adobe CQ5, Enterprise Content Management and Web Development.

**How does CQ5's architecture compare to a standard MVC scenario?**

&gt; As we all know, MVC stands for Model, View, &amp; Controller. This is the logical separation of work into those three buckets to allow for more modular and readable code. CQ follows this model (even if you may not notice you're doing it!). In CQ, we utilize JSP and the JCR for the model, a combination of JSP and Client libs for the view, and OSGi Services for the controller.  
&gt; —[Ryan McCullough, Staff Engineer][1]

&gt; Technically speaking, CQ5 IS MVC, just a form that seems to be unfamiliar to most MVC developers. I think that most people find CQ5's architecture "too coupled" to call it MVC. The biggest complaint I hear is that they would like the data more decoupled from the rendition. Regardless, Sling provides the controller, CRX provides the model, and JSP's/Scripts (ecma, etc) provide the view.  
&gt; — [Michael Kelleher, Technical Lead][2]

&gt; Adobe CQ5's architecture has an overall MVC based approach, however the foundation components do a poor job of following MVC based best practices. &nbsp;In CQ5 the Sling Resource Resolver and default Sling/CQ Servlets provide the controllers, the Resources and ValueMaps provide the Models and the Sling Scripting support provides the Views as JSPs or other scripting files.
&gt; 
&gt; Project teams and CQ developers should attempt to follow MVC practices when developing on CQ5 by avoiding business logic in their JSPs, putting business logic in OSGi Services and leveraging new tools such as the upcoming [Sling Proxy][3], to create the models.  
&gt; — [Daniel Klco, Technical Lead][4]

 [1]: http://ca.linkedin.com/in/ryanmccullough "Ryan McCullough's Profile"
 [2]: http://www.linkedin.com/in/mjke11eher "Michael Kelleher's Profile"
 [3]: https://github.com/SixDimensions/sling-proxy "Sling Proxy - Make easy modals in Apache Sling"
 [4]: http://www.linkedin.com/in/danielklco/ "Dan Klco's Profile"  