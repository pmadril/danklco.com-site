---
layout: post
title: "MessageGatewayService vs MessageGateway"
original: http://labs.sixdimensions.com/blog/dklco/2012-08-31/messagegatewayservice-vs-messagegateway
summary: "It is important to understand the distinction between the two ways of getting the Message Gateway"
tags: [Adobe CQ, Apache Felix]
---

When creating services which use the CQ5's [MessageGateway API](http://dev.day.com/docs/en/cq/current/javadoc/com/day/cq/mailer/MessageGateway.html) to send emails, it can be tempting to use the following to directly reference the MessageGateway you need in your service:

    @Reference
	MessageGateway messageGateway; `

Unfortunately, this can cause issues as the MessageGateway will not be available if the [Day CQ Mail Service is not configured](http://labs.sixdimensions.com/blog/dklco/2012-08-20/sending-email-adobe-cq-api#Configuring_CQ_Mail_Service). &nbsp; If the Day CQ Mail Service is not configured the MessageGateway service will not be registered in OSGi.&nbsp; This will mean that your component will not register properly and may cause a cascade through any Services which use your original service.&nbsp;

The worst part is that CQ5 will not log any error messages indicating that the services are not being registered in the default logging configuration, nor will the bundle fail to start.&nbsp; The only way to discover the issue is to look at the components list at {host}:{port}/system/console/components, find services which should be working and see what is unsatisfied for those services.

To avoid this issue, always reference the MessageGatewayService, and retrieve the MessageGateway from the MessageGatewayService.

	@Reference
	MessageGatewayService messageGatewayService;
	[...]
	MessageGateway[HtmlEmal] messageGateway = messageGatewayService.getGateway(HtmlEmail.class);
	if(messageGateway == null){
		throw new MessagingException("Unable to retrieve message gateway for HTMLEmails, please configure Gateway in OSGi Console");
	}

Since the MessageGateway can be unavailable at any time, I would recommend doing a check like the code above and logging a friendly message to the logs.
