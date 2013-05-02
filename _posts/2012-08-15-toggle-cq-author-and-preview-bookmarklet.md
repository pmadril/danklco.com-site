---
layout: post
title: "Toggle CQ Author and Preview Bookmarklet"
original: http://labs.sixdimensions.com/blog/dklco/2012-08-15/toggle-cq-author-and-preview-bookmarket
summary: "Download and learn how to use a bookmarklet for switching between author and a better preview mode in Adobe CQ"
tags: [Adobe CQ]
---

When using Adobe CQ5, you often want to be able to switch between author and preview mode.  Unfortunately, the preview included in the Sidekick does not provide a complete preview as it does not remove the Sidekick or the Content Finder.

I created a bookmarklet which will switch the page between authoring mode and a preview where the Sidekick and Content Finder are removed and the WCMMode is set to disabled.  This bookmarklet preserves query string and hash values.   It has been tested in CQ 5.5 and works in FireFox and Chome.  It does not work in Internet Explorer.

### Adding the Bookmarklet
Follow these procedures to add the bookmarklet depending on your current browser.  The bookmarklet is most useful when placed in your bookmark toolbar for quick access.

**In FireFox**

Right click on the link below and select Bookmark This Link to add the bookmarklet.

**In Chrome**

Right click on the link below and select Copy link address.  Next, right click on your bookmark toolbar and select Add Page..., paste in the url you copied and set the name to CQ Toggle or whatever makes sense for you.

[Toggle CQ][1]

Below is the JavaScript code used by the bookmarklet to determine the correct URL to load based on whether or not the content finder is currently enabled and the presence or absence of the wcmmode=disabled query string parameter.  Please comment on this article if you have any request, find any bugs, etc.

	(function(){
	  var DISABLED = 'wcmmode=disabled';
	  var CONTENT_FINDER = '/cf';
	  // Creates the path by combining the path and query string parameters
	  var createURL = function(path, qs, hash) {
		var url = path;
		if(qs.length != 0 && !(qs.length == 1 && qs[0] == '')) {
		  url += '?' + qs.join('&');
		}
		url += hash;
		return url;
	   };
	   var hash = '';
	   var parameters = [];
	   if (window.location.search.substring(1) != '') {
		 parameters = window.location.search.substring(1).split('&');
	  }
	  var path = '';
	  if (window.location.pathname != CONTENT_FINDER) {
		// We are not in author mode
		path = CONTENT_FINDER + '#' + window.location.pathname;
		if(parameters.indexOf(DISABLED) != -1){
		  // remove the wcmmode disabled parameter
		  parameters.pop(DISABLED);
		}
		hash = window.location.hash;
	  } else {
		// this page is in author mode, get the URL info from the frame
		path = window.frames[1].location.pathname;
		if(window.frames[1].location.search.substring(1) != '') {
		  parameters = window.frames[1].location.search.substring(1).split('&');
		}
		if(parameters.indexOf(DISABLED) == -1){
		  // add the disabled parameter
		  parameters.push(DISABLED);
		}
		hash = window.frames[1].location.hash;
	  }
	  var url = createURL(path, parameters, hash);
	  window.location = url;
	});

[1]: javascript:(function(){var%20a="wcmmode=disabled";var%20b="/cf";var%20c=function(a,b,c){var%20d=a;if(b.length!=0&&!(b.length==1&&b[0]=="")){d+="?"+b.join("&")}d+=c;return%20d};var%20d="";var%20e=[];if(window.location.search.substring(1)!=""){e=window.location.search.substring(1).split("&")}var%20f="";if(window.location.pathname!=b){f=b+"#"+window.location.pathname;if(e.indexOf(a)!=-1){e.pop(a)}d=window.location.hash}else{f=window.frames[1].location.pathname;if(window.frames[1].location.search.substring(1)!=""){e=window.frames[1].location.search.substring(1).split("&")}if(e.indexOf(a)==-1){e.push(a)}d=window.frames[1].location.hash}var%20g=c(f,e,d);window.location=g})();