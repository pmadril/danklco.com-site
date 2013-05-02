---
layout: post
title: "Select from Pages in a CQ5 Dialog"
original: http://labs.sixdimensions.com/blog/dklco/2012-08-05/select-pages-cq5-dialog
summary: "Learn how to select from a dynamically retrieved list of pages in a CQ Dialog"
tags: [Adobe CQ, Dialog]
---

When constructing a dialog, you may want to present users with a list of pages to select from. &nbsp;Browse and path fields work well for selecting from a tree, but often you may need to show just the pages from a single folder or from some discrete list.

### Using the optionsProvider

One way to do this is to create a [selection][1] field and populate the value through a JavaScript function in the optionsProvider field. &nbsp;This field is supposed to contain a function which gets called when the dialog loads and returns a JavaScript Array of Objects containing the data to populate the selection.

Each object can have the following attributes:

*   value - the value to save into the repository
*   text - the text to display to the user
*   qtip - hover text, extra information for the user

### Getting the URL

First, we get the path to the pages to retrieve.&nbsp; Depending on your need you can calculate a path or hard code the path.&nbsp; In this case, we will get the current page's path and append the the selector 'infinity.json'.&nbsp; This selector will create a JSON representation of the page structure, you can also control how deep the JSON structure will be by replacing infinity with a number, ex: 2.json

Next, we pass that path into a [function which will create a non-cacheable URL][2].&nbsp; This ensures CQ will not serve up cached data when the author attempts to use the dialog.

    // get the URL to retrieve the pages
    var url = CQ.HTTP.noCaching(CQ.HTTP.getPath()%2B'.infinity.json');

### Retrieving the Page JSON Data

Once we have the url, we can get CQ to retrieve it.&nbsp; CQ provides a [convenience function for a synchronous JSON GET request][3], so we'll use that:

    var childPages = CQ.HTTP.eval(url);

### Creating the List of Pages

Finally, we will loop through the list of child pages and extract the information we need to construct our list.&nbsp; Since the JSON representation includes all of the properties for the page, it is easy to retrieve the title or even have conditional logic depending on what attributes are available on the page.

    // loop through the child pages and create the list of child pages
    for(var name in childPages){
        if(childPages[name]['jcr:content']){
            var child = {};
			child['text'] = childPages[name]['jcr:content']['jcr:title'];
			child['value'] = CQ.HTTP.getPath() %2B '/' %2B name;
			children.push(child);
        }
    }

### Wrapup

Once we have the array of children objects, we can return that array and it will be used to populate the select field.&nbsp; In the end your optionsProvider function will look like:

    function(){
        //create an array of the child pages
        var children = new Array();
        // get the URL to retrieve the pages
		var url = CQ.HTTP.noCaching(CQ.HTTP.getPath()%2B'.infinity.json');
		//retrieve the child pages
		var childPages = CQ.HTTP.eval(url);
		// loop through the child pages and create the list of child pages
		for(var name in childPages){
		    if(childPages[name]['jcr:content']){
			    var child = {};
				child['text'] = childPages[name]['jcr:content']['jcr:title'];
				child['value'] = CQ.HTTP.getPath() %2B '/' %2B name;
				children.push(child);
			}
		}
		return children;
	}`

You can download a [complete example dialog xml][4], make sure to right-click and save as.

 [1]: http://dev.day.com/docs/en/cq/current/widgets-api/index.html?class=CQ.form.Selection "Selection Field in the CQ5 Widgets API"
 [2]: http://dev.day.com/docs/en/cq/current/widgets-api/output/CQ.HTTP.html#noCaching "CQ HTTP noCaching Method"
 [3]: http://dev.day.com/docs/en/cq/current/widgets-api/output/CQ.HTTP.html#eval "CQ Shared HTTP eval method"
 [4]: http://www.6dlabs.com/sites/default/files/assets/dialog.xml "Example page selection dialog"  