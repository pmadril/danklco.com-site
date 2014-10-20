---
layout: post
title: 'There''s Your Problem: Spaces after the Jekyll Yaml Front Matter'
tags:
  - Jekyll
  - YAML
  - GitHub
summary: 'Describes an issue I ran into with Jekyll around whitespace following the YAML Front Matter separator.'
---



Recently, I ran into a pretty perplexing issue with a Github pages site where the pages were being published without being properly templatized and displaying the YAML front matter. After investigation I realized the issue started when Github [upgraded from Jekyll 1.5.1 to 2.2.0 for generating Github Pages](https://github.com/blog/1867-github-pages-now-runs-jekyll-2-2-0).  The problem with diagnosing this is, Jekyll does a very poor job of telling what it is actually doing, so figuring out what was happening was quite difficult.  Especially since the pages looked correct from visual inspection.

It turns out the problem was that [Jekyll was changed to be more strict on the Yaml front matter delimiters](https://github.com/jekyll/jekyll/issues/2650) in release 2.x, in Jekyll 1.x, you could have whitespace after the dashes, however in Jekyll 2.x you must only have a line break. To fix affected pages simply remove any whitespace after the Yaml front matter dashes and you should be good to go.