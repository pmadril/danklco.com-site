---
layout: post
title: "Three Commonly Missed CQ Best Practices"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-07-03/three-commonly-missed-cq-best-practices
summary: "My summary of three best practices many CQ projects miss"
tags: [Adobe CQ, Development, Best Practices, CRXDE]
---

Recently, I saw [this thread on the Day Communique Google Group](https://groups.google.com/d/topic/day-communique/gIa_yyOmC7o/discussion). &nbsp;In the thread, a developer asks why he cannot use CRXDE in their production environment. &nbsp;As it turns out, his employer followed the [best practices for hardening CQ instances](http://dev.day.com/docs/en/cq/current/deploying/security_checklist.html#Disable%20WebDAV) as recommended by Adobe which disables the WebDav servlet CRXDE uses. &nbsp;

This thread demonstrates three common problems I've seen on CQ installations. &nbsp;Especially, when the implementers of the CQ installation are not familiar with CQ and Java Development best practices.

  * ### 1\. QA Not Matching Production

In this case CRXDE shouldn't work in QA either. &nbsp;If the Production and QA environments don't exactly match, you can't be 100% sure your code will work once you move it to production. &nbsp;The purpose of a QA or Pre-Production environment is to ensure that the deployment will work when it's outside of the developer sandbox. &nbsp;As a note, this includes content. &nbsp;Many CQ components and services require specific content structures to function as expected, in order to ensure your testing is valid, it is essential to sync content back from Production into QA and other environments.

  * ### 2\. Developer Access to Production

Developers should not need access to production, except read-only views of the logs. &nbsp;You should not need to connect to an IDE to see the deployed code, the only code in production should be a tagged release, which you can download out of your Maven Repo or SCM system. &nbsp;Using Tagged releases and a good release process ensures that you can know what code was actually deployed at any point in time and easily revert to older versions of code. &nbsp;God help you if you are making changes live in production.

  * ### 3\. Using CRXDE

Just don't use CRXDE for development. It encourages these sorts of bad practices as it doesn't have sufficient tooling to allow for real, tagged releases. CRXDE makes a decent training tool, however for real-world development use a real IDE such as IntelliJ or Eclipse. Your release process will be much easier if you can leverage more advanced SCM tools, such as [GIT](http://git-scm.com/) and more advanced build tools, such as [Maven](http://maven.apache.org/).

If your organization's CQ deployment suffers from these or any other problems, please consider getting a free [CQ Assessment from Six Dimensions](http://www.sixdimensions.com/cq5sla/). Together, we can review your installation and current development process and make recommendations on what you can do and how we can help you make your CQ installation rock solid and reduce the cost and time for maintaining your CQ installation.

&nbsp;

[Sign Up for a Free CQ Assessment](http://www.sixdimensions.com/cq5sla/)

&nbsp;