---
layout: post
title: "Service Boss Level Part 2: Custom Web Console Plugins"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-09-11/service-boss-level-part-2-custom-web-console-plugins
summary: "Discusses the process for creating a custom Apache Felix Web Console Plugin"
tags: [Adobe CQ, Apache Felix, Apache Sling, OSGi]
thumbnail: /images/posts/2013-09-11-service-boss-level-part-2-custom-web-console-plugins/web-console-plugin.png
---

You've got your awesome service. &nbsp;It performs all sorts of complex tasks and maybe even uses a [Sling Service Factory](/posts/2013/08/27/service-boss-level-service-factories/) to provide multiple configurations. &nbsp;But how do you know what it's doing? &nbsp;Well, of course you need to have appropriate logging, but another tool you can leverage is the Apache Felix Web Console, by creating a custom Web Console Plugin. &nbsp;Your plugin can be accessed through Adobe CQ and Apache Sling's&nbsp;Web Console and can display any information you can render in HTML.

Apache Felix provides a really simple class you can extend for creating custom Web Console screens, the [AbstractWebConsolePlugin][2]. &nbsp;This class will automatically leverage the look and feel of the Apache Felix console and makes it easy for you to create your own console screen. &nbsp;There are three main methods to override:

* [getLabel][3] \- This method should return the URL for the console page, ex: helloworld
* [getTitle][4] \- This method should return the text to display to the user in the Felix Console navigation and title bar
* [renderContent][5] \- This method will be executed when your Web Console page is accessed, it should write out the Web Console page content

Your WebConsole plugin class, should extend the AbstractWebConsolePlugin class and should be a standard OSGi Service. &nbsp;You should extend the Servlet interface and should have properties exposing the label and title for your Web Console plugin as properties. Generally, I would recommend using constants to ensure that the method and properties use the same value.


    @Component
    @Service(value={Servlet.class})
    @Properties({
    &nbsp;&nbsp;@Property(name=WebConsoleConstants.PLUGIN_LABEL,value=HelloWorldWebConsole.LABEL),
    &nbsp;&nbsp;@Property(name = WebConsoleConstants.PLUGIN_TITLE,value=HelloWorldWebConsole.TITLE)})
    public class HelloWorldWebConsole extends AbstractWebConsolePlugin {
    &nbsp;&nbsp;[... code ...]
    }

Since the Web Console plugin is an OSGi service, you can inject references to any other Service or Component. &nbsp;You can simply retrieve the Service you want to monitor and retrieve the information you need from it.

When you go to to write the HTML to the page, retrieve the PrintWriter from the response, ex: res.getWriter(). &nbsp;The console supports easily styled tables, with styled header rows, make sure to add the CSS class 'content' to all cells containing content to get the correct padding. &nbsp;Additionally, you can add the class 'container' to make a column header with a grey background.

Once your Web Console Plugin is complete, you should be able to access it from the Apache Felix Web Console. &nbsp;If you are using CQ 5.6, it will be in the Main dropdown.

<img src="/images/posts/2013-09-11-service-boss-level-part-2-custom-web-console-plugins/web-console-plugin.png" alt="Web Console Plugin Screen" class="img-responsive" />

As you can see Custom Web Console Plugins are easy to create and can allow administrators valuable views into the functioning of OSGi Services and the health of your application.

   [2]: http://felix.apache.org/apidocs/webconsole/3.0.0/org/apache/felix/webconsole/AbstractWebConsolePlugin.html (Felix AbstractWebConsolePlugin)
   [3]: http://felix.apache.org/apidocs/webconsole/3.0.0/org/apache/felix/webconsole/AbstractWebConsolePlugin.html#getLabel() (JavaDocs for the getLabel method)
   [4]: http://felix.apache.org/apidocs/webconsole/3.0.0/org/apache/felix/webconsole/AbstractWebConsolePlugin.html#getTitle() (JavaDocs for the getTitle method)
   [5]: http://felix.apache.org/apidocs/webconsole/3.0.0/org/apache/felix/webconsole/AbstractWebConsolePlugin.html#renderContent(javax.servlet.http.HttpServletRequest,%20javax.servlet.http.HttpServletResponse) (JavaDocs for the renderContent Method)
  