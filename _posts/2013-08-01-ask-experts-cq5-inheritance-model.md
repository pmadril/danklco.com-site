---
layout: post
title: "Ask the Experts: CQ5 Inheritance Model"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-08-01/ask-experts-cq5-inheritance-model
summary: "Asking the experts to compare CQ's Inheritance Model to Java's Inheritance Model"
tags: [Adobe CQ, Ask the Experts, Apache Sling]
---

In this series of blog posts we pose a question to experts in the Adobe CQ5 platform about Adobe CQ5, Enterprise Content Management and Web Development.

### What's the difference in CQ5's inheritance model versus standard Java?

> The main difference that I can think of is that in standard Java, you will write a class which inherits all the methods of a previous class. These methods can be modified and overwritten, and new methods even added to enhance functionality. In CQ, the inheritance is much more basic. It is based on JSP’s – I like to compare the two by thinking of the JSP’s as methods, and the components as classes. Where by default, an empty component with nothing overridden will match exactly the super resource. However, if you add a JSP to your component matching the name of the super resource, that JSP will take precedence over the super resources, allowing you to override smaller portions.
—[Ryan McCullough, Staff Engineer][1]

> They are very similar: they both support single inheritance, and polymorhism. Scripts defined within a "parent" resource may be "overriden" by a child by simply defining the same script. This is very similar in concept to extending a Class and overriding a method by defing the same method name with the same signature. The one thing that CQ5 (Sling implements this, not CQ5) does not support is scoping. There is no concept of Public, Package Protected, Protected and Private. In Sling, everything is Public. Once a Script is defined, ANY Child may override it.
— [Michael Kelleher, Technical Lead][2]

> Like Java, inheritance in CQ is just single inheritance, where there can only be a single super type. &nbsp;Inheritance in CQ is part of the Sling framework and is done by using the sling:resourceSuperType attribute for setting the super type for a component. &nbsp;Using the super type, CQ components will inherit parts from the super component such as scripts and dialogs which are not defined in the current component. &nbsp; If the component inheritance is thought of as similar to Java's class inheritance, then each script can be thought of as similar to a method. &nbsp;Overall, the two concepts are pretty similar their main differences are the actual execution and the fact that CQ inheritance does not have any permissions, all scripts can be overridden.
— [Daniel Klco, Associate Director][3]

   [1]: http://ca.linkedin.com/in/ryanmccullough (Ryan McCullough's Profile)
   [2]: http://www.linkedin.com/in/mjke11eher (Michael Kelleher's Profile)
   [3]: http://www.linkedin.com/in/danielklco/ (Dan Klco's Profile)
  