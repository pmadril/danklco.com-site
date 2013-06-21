---
layout: post
title: "Simple Container Component Start &amp; End Bars"
original: http://labs.sixdimensions.com/blog/dan-klco/2013-06-21/simple-container-component-start-end-bars
summary: "See how easy it is to change the design path on a CQ Component"
tags: [Adobe CQ, Components, Best Practices]
---

When creating a container component for Adobe CQ, you often run into an issue where the resulting page is difficult to author as there are too many [parsys][1]&nbsp;adjacent to each other. &nbsp;As bad as this situation is for the component developer, imagine how confusing it must be to authors who don't have a detailed understanding of how the component works. &nbsp;As you can see from the illustration below of a tab component, when you have multiple parsys in a single component it can get very confusing as to what each parsys does. &nbsp;

![A component with no start or end bars][2]A container component without start or end bars

My first thought in handling this was to dynamically update the empty text for the parsys based on the component name, however this proved to be difficult if not impossible without overwriting the entire parsys component. &nbsp;Instead, I decided to take a look at the [iparsys][3], which displays a bar below it's parsys. &nbsp;The answer turned out to be simple. &nbsp;I just needed to add two nearly empty sub-components to render the start and end bars (as needed).

The components should be created as child components of your container component and only need to have the node configuration, a [CQ Edit Configuration][4] and a empty JSP. &nbsp;The component configuration, shown below simply sets the name of the component and declares the type.

    &lt;?xml version="1.0" encoding="UTF-8"?&gt;
    &lt;jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
       jcr:primaryType="cq:Component"
       jcr:title="End Tab"
       componentGroup=".hidden"/&gt;

The Edit Configuration is similarly simple. It just enables the edit bar and adds a single title item into the edit bar.

    &lt;?xml version="1.0" encoding="UTF-8"?&gt;
    &lt;jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
        cq:actions="[text:End Tab]"
        cq:layout="editbar"
        jcr:primaryType="cq:EditConfig"/&gt;

As the JSP is just blank I doubt I need to show it. &nbsp;The start component is similar, with only the names updated. &nbsp;

Once you have created your components you simply surround the parsys's in your container component with these components.
 
    &lt;cq:include path="tab-1-start" resourceType="myapp/components/general/tabs/start" /&gt;
    &lt;cq:include path="tab-1" resourceType="foundation/components/parsys" /&gt;
    &lt;cq:include path="tab-1-end" resourceType="myapp/components/general/tabs/end" /&gt;

Once this is complete and installed into CQ, you should now see the start and end bars surrounding your container component's parsys, clearly delimiting where your component starts and ends.

![The same component with start and end bars][5]The same component with start and end bars

As you can see it is much easier to tell what parsys's belong to the compoent and which ones belong to containing components. &nbsp;Taking the simple step of adding start and end components makes it much easier for authors and other maintainers to edit container components.

   [1]: http://wem.help.adobe.com/enterprise/en_US/10-0/wem/wcm/default_components.html#Paragraph%20System%20(parsys) (Documentation on Adobe CQ's Paragraph System component)
   [2]: /images/posts/2013-06-21-simple-container-component-start-end-bars/no-start-end-bars.png
   [3]: http://wem.help.adobe.com/enterprise/en_US/10-0/wem/wcm/default_components.html#Inheritance%20Paragraph%20System%20(iparsys) (Documentation on Adobe CQ's Inheritance Parsys Component)
   [4]: http://dev.day.com/docs/en/cq/current/developing/components/edit_config.html (The Adobe CQ Edit Configuration Documentation)
   [5]: /images/posts/2013-06-21-simple-container-component-start-end-bars/with-start-end-bars.png
  