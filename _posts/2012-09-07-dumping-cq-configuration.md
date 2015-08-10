---
layout: post
title: "Dumping CQ Configuration"
original: http://labs.sixdimensions.com/blog/dan-klco/2012-09-07/dumping-cq-configuration
summary: "Learn how easy it is to get a complete copy of your Adobe CQ configuration"
tags: [Adobe CQ, How To]
thumbnail: /images/posts/shared/CQ5.png
---

Often when providing remote support, you may want to send a complete snapshot of a CQ instance's configuration and state to others to help debugging.&nbsp; Generating a report of the complete status of the OSGi configuration, environment state and logs is as easy as invoking a single url.&nbsp;

The OSGi console will generate a report of the following items when you invoke: {SERVER}:{PORT}/system/console/config/configuration-status.zip

*   All Log Files
*   Wire Admin
*   Threads
*   System Properties
*   Sling Thread Pools
*   Sling Settings
*   Sling Servlet Filters
*   Sling Scheduler Jobs
*   Sling Resource Resolver Map Entries
*   Sling Referrer Filters
*   Sling Properties
*   Sling Eventing Queue
*   Available Sling Adaptors
*   Services &amp; their properties
*   Registered Script Engines
*   CRX Configuration
*   Product/Licensing Information
*   Preferences/Permissions (if Available)
*   Java Package Admin
*   Installed Bundles
*   Memory Usage
*   Log Configuraiton
*   JMX/MBeans Configuration
*   Http WhiteBoard
*   GFX Information
*   Declarative Services Components
*   Configuraitons
*   CQ4 Migration Configuration
*   Bundle Information

You can also get a text file with the same information, except the log files, by invoking {SERVER}:{PORT}/system/console/config/configuration-status.txt.  