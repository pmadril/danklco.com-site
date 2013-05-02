---
layout: post
title: "Why does my TextImage Resource Type Keep Changing!?"
original: http://labs.sixdimensions.com/blog/dan-klco/2012-10-10/why-does-my-textimage-resource-type-keep-changing
summary: "Learn about what could be changing the Resource Type on your custom TextImage component"
tags: [CQ 5.5, Adobe CQ, Gotcha, How To]
---

On my current project, we ran into a very weird issue where the dialog kept changing when user's dragged images into the TextImage component we overrode from the [foundation TextImage component][1].&nbsp; Specifically, this only seemed to happen when user's dragged images into the component inline.&nbsp;

After doing some investigation, I found that the sling:resourceType on the nodes was changing when the image was dragged into the component.&nbsp; The culprit is the CQ Edit Configuration in the foundation TextImage component.

In CQ 5.5, the TextImage component includes the ability to drag images into the component without opening the dialog.&nbsp; To enable this functionality, Adobe set the parameters to send to the server when an image is dropped into a TextImage component in the CQ Edit Configuration.&nbsp; One of these parameters sets the sling:resourceType to 'foundation/components/textimage'.&nbsp; This will cause the component instance resource type to revert to the out of the box textimage component instead of your custom component when an image is dragged into the component inline.

To fix this issue, simply add the CQ Edit Configuration into your component and set the sling:resourceType to the resource type for your custom component.&nbsp; If you export the file with VLT, the result will look like this:

	<?xml version="1.0" encoding="UTF-8"?>
	<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
		jcr:primaryType="cq:EditConfig">
		<cq:dropTargets jcr:primaryType="nt:unstructured">
			<image
				jcr:primaryType="cq:DropTargetConfig"
				accept="[image/.*]"
				groups="[media]"
				propertyName="./image/fileReference">
				<parameters
					jcr:primaryType="nt:unstructured"
					sling:resourceType="MYAPP/components/textimage">
					<image
						jcr:primaryType="nt:unstructured"
						sling:resourceType="foundation/components/image"
						imageCrop=""
						imageMap=""
						imageRotate=""/>
				</parameters>
			</image>
		</cq:dropTargets>
		<cq:inplaceEditing
			jcr:primaryType="cq:InplaceEditingConfig"
			active="{Boolean}true"
			configPath="../../dialog/items/tab1/items/text"
			editorType="text"/>
	</jcr:root>

 [1]: http://dev.day.com/docs/en/cq/current/wcm/default_components.html#Text%20Image  