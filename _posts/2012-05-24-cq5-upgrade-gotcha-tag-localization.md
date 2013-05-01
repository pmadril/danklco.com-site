---
layout: post
title: "Permalink to CQ5 Upgrade Gotcha: Tag Localization"
original: http://labs.sixdimensions.com/blog/dklco/2012-05-24/cq5-upgrade-gotcha-tag-localization
summary: "Learn what can go wrong with Tags when upgrading CQ5 and how to fix it"
tags: [Adobe CQ, CQ 5.5, Tag Manager]
---

In CQ 5.4, Adobe added the ability to translate tags through the Tag Manager.&nbsp; Unfortunately, due to the way this was implemented, it can cause issues when upgrading from CQ 5.3 or older.

After performing the upgrade and importing the existing tags, you may find there are no languages available to translate the tags.&nbsp; The Localization section will be visible, however no languages are available.

![Tag Language Error Screenshot][1]

Fortunately, the fix for this issue is easy.&nbsp; Update the node at /etc/tags to have a repeating String attribute called languages with the languages in which you wish to localize the tags.&nbsp; More information can be found on Adobe's documentation website:

 [1]: /images/posts/2012-05-24-cq5-upgrade-gotcha-tag-localization/Tag_Language_Error.png "Tag Language Error Screenshot"  