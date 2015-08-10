---
layout: post
title: "What is my CQ Mode?"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-04-02/what-my-cq-mode
summary: "Figuring out what is the current authoring mode in components in Adobe CQ can sometimes be a tricky prospect.  Determining the current authoring mode is important for component development when you may want to display different HTML or controls to authors than will be displayed to the end users.  As a best practice, the same interface should display in Author and Design mode, as hiding or showing components may affect design."
tags: [Adobe CQ, Dialog, Components, Best Practices, JavaScript]
thumbnail: /images/posts/shared/CQ5.png
---

Figuring out what is the current authoring mode in components in Adobe CQ can sometimes be a tricky prospect. &nbsp;Determining the current authoring mode is important for component development when you may want to display different HTML or controls to authors than will be displayed to the end users. &nbsp;As a best practice, the same interface should display in Author and Design mode, as hiding or showing components may affect design.

The most obvious solution is to determining the authoring mode is to use the `com.day.cq.wcm.api.WCMMode`&nbsp;Java class, which does a server-side check to see what mode is currently being used. &nbsp;

On new projects, I add a check for the WCMMode into the project's global.jsp and populate variables for testing if in design or author mode as such:

	<%
	boolean isEdit = WCMMode.fromRequest(request) == WCMMode.EDIT;
	boolean isDesign = WCMMode.fromRequest(request) == WCMMode.DESIGN;
	%><c:set var="isEdit" value="<%= isEdit %>" /><c:set var="isDesign" value="<%= isDesign %>" />

That way everyone can simply check isEdit or isDesign in all of my components and render the correct HTML instead of having it be checked ad-hoc on a number of different components.

But what about checking the mode JavaScript? &nbsp;Well, you could certainly push a variable out with your HTML, but there are some downsides:

*   If your component is in an iParsys, it will register as being in WCM Disabled mode
*   There's already an API provided in CQ

The [CQ.WCM][1] object provides methods for checking the current mode, however first you need to see if the object exists. &nbsp;CQ.WCM is not instantiated in publish mode, so if it does not exist, you automatically know you are in publish.

Once you have verified the CQ.WCM object exists, you can call one of the methods [isEditMode][2], [isDesignMode][3]&nbsp;or [isPreviewMode][4]&nbsp;to check if the page is rendering in the appropriate state.&nbsp;

	// figure out the current mode
	if(CQ.WCM) {
	  if (CQ.WCM.isEditMode(true) || CQ.WCM.isDesignMode(true)){
		isPublish = false;
	  }
	}

There is a method&nbsp;[getMode][5], which theoretically returns the current mode, however in CQ 5.5, this seems to only return null.

Using these two methods, you can accurately determine the current CQ Authoring mode in your components and react appropriately.

 [1]: http://dev.day.com/docs/en/cq/current/widgets-api/index.html?class=CQ.WCM "Adobe CQ CQ.WCM JavaScript API"
 [2]: http://dev.day.com/docs/en/cq/current/widgets-api/index.html?class=CQ.WCM#CQ.WCM-isEditMode "Is Edit Mode - Adobe CQ JavaScript API"
 [3]: http://dev.day.com/docs/en/cq/current/widgets-api/index.html?class=CQ.WCM#CQ.WCM-isDesignMode "isDesignMode - Adobe CQ JavaScript API"
 [4]: http://dev.day.com/docs/en/cq/current/widgets-api/index.html?class=CQ.WCM#CQ.WCM-isPreviewMode "isPreviewMode - Adobe CQ JavaScript API"
 [5]: http://dev.day.com/docs/en/cq/current/widgets-api/index.html?class=CQ.WCM#CQ.WCM-getMode "getMode Adobe CQ JavaScript API"  