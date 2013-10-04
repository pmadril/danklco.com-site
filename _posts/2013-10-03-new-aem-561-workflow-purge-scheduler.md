---
layout: post
title: "New in AEM 5.6.1: Workflow Purge Scheduler"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-10-03/new-aem-561-workflow-purge-scheduler#sthash.wYJzrOLS.dpuf
summary: "Introduction and basic documentation for the new Workflow Purge Scheduler in CQ 5.6.1"
tags: [AEM 5.6.1, Adobe CQ, Workflow Troubleshooting, Apache Sling, OSGi]
---

In previous versions of Adobe CQ5/AEM in order to purge old completed workflows, you needed to either write a custom job or install an [additional package][1] provided by DayCare. &nbsp;Now in AEM 5.6.1, this functionality comes out of the box with the product.

### Why Purge Completed Workflows?

So why would you want to purge completed workflows? &nbsp;Workflow instances are stored as nodes inside CQ. &nbsp;Generally, this doesn't pose a problem for author-generated workflows, at least not over the short and medium term. &nbsp;However, for very long running CQ instances or instances where website users or automated jobs can run workflows, this can quickly add up to large amounts of content accumulating in your repository. &nbsp;This can lead to slow performance and growing disk usage.

To avoid this, you can simply purge old workflows.

### Enabling the Workflow Purge Scheduler

It does not come pre-configured, however so to enable CQ to automatically purge your workflows you will need to create a Workflow Purge Scheduler instance. &nbsp;The&nbsp;Workflow Purge Scheduler is a [Sling Service Factory][2], so creating an instance is as easy as logging into the Apache Felix Configuration Console and selecting the %2B button next to&nbsp;Workflow Purge Scheduler:

![Workflow Purge Scheduler][3]

Most of the fields in the scheduler are pretty self-explanitory. &nbsp;When you click Save, the scheduler will be scheduled on the [cron schedule][4] you specify and will purge workflows older than the specified number of days using the configuration you specify.

### Configuring the Workflow Purge Scheduler in a Package

This is all well and good, but let's just say you wanted to just deploy a configuration as a part of your package deployment process. &nbsp;Through the magic of [Apache Sling's OSGi Configurations][5], you can do this with a simple XML file.

Simply create an XML file in your IDE in your content project under a path like:

`/apps/[my-app]/config`

Set the name of the file to:

`com.adobe.granite.workflow.purge.Scheduler-com.adobe.granite.workflow.purge.Scheduler.config.[some-arbitrary-id].xml`

and put in the following contents, replacing with the values for your configuration:


    <?xml version="1.0" encoding="UTF-8"?>
    <jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" jcr:primaryType="sling:OsgiConfig"
      scheduledpurge.name="Purge All Completed Workflows"
      scheduledpurge.workflowStatus="COMPLETED"
      scheduledpurge.modelIds="[]"
      scheduledpurge.cron="0 0 * * * ?"
      scheduledpurge.daysold="30" />

Once you deploy this file as part of your content package, you should see the configuration show up under the&nbsp;Workflow Purge Scheduler in the OSGi Configuration console.

   [1]: http://helpx.adobe.com/cq/kb/howtopurgewf.html
   [2]: /posts/2013/08/27/service-boss-level-service-factories
   [3]: /images/posts/2013-10-03-new-aem-561-workflow-purge-scheduler/Workflow-Purge-Scheduler.png (Workflow Purge Scheduler)
   [4]: http://quartz-scheduler.org/documentation/quartz-1.x/tutorials/crontrigger
   [5]: http://dev.day.com/docs/en/cq/current/deploying/configuring_osgi.html#OSGi%20Configuration%20in%20the%20Repository
  
