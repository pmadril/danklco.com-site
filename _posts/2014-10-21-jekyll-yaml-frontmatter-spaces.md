---
layout: post
title: 'Jekyll Yaml Frontmatter Spaces'
---


With Github's recent upgrade to Jekyll 2.x from 1.x, I ran into a pretty perplexing issue with a Github pages site.  The issue was that certain pages would not be processed by Jekyll and would be published with their Yaml front matter visible and without being templatized. The issue is, Jekyll does a very poor job of telling what it is actually doing, so figuring out what was happening was quite difficult.  Especially since the pages looked correct from visual inspection.

It turns out the problem was that Jekyll got more strict on the Yaml front matter structure in release 2, in Jekyll 1.4.3, you could have whitespace after the dashes, however in Jekyll 2 you must only have a line break. To fix affected pages simply remove any whitespace after the Yaml front matter dashes and you should be good to go.