---
layout: post
title: "Automatically deploying Jekyll sites with PHP"
summary: "Provides a PHP script for automatically deploying Jekyll sites via a GitHub Post Receive Hook"
tags: [PHP, Jekyll, GitHub]
thumbnail: /images/posts/shared/jekyll.png
---

I've been hosting a couple sites using GitHub as a repository and Jekyll to create the 
site.  Due to legacy URLs and general use of .htaccess rules, these sites need to be 
hosted on Apache httpd instead of GitHub pages.

One of the things I miss about GitHub pages is the automatic deployments.  Initially,
I attempted to fix this with periodic rebuilding, which was frustrating as it either 
wasted CPU cycles by running too often or ran to infrequently to really be useful.  Next,
I tried adding hooks on a per site basis, but it seemed inefficient and I didn't want 
to have server information is public repositories.

Finally, I settled on creating an [application in PHP](https://github.com/klcodanr/PHP-Jekyll-Post-Receive-Hook) to update all of the sites via a
[GitHub Post Receive Hook](https://help.github.com/articles/post-receive-hooks).  For 
those not familiar, these are integrations GitHub will invoke after code is pushed into 
GitHub's repositories.  In this case, the receiving end is a simple PHP script which maps 
the data GitHub posts into a local git repo and builds the Jekyll site for you.  This 
script uses a configuration file to avoid the direct input being used to regenerate the 
sites, thus avoid potential command injection vulnerabilities.

To get started, you can simply clone the 
[repository](https://github.com/klcodanr/PHP-Jekyll-Post-Receive-Hook) into a directory
or virtual host served by Apache and create your own config.json.  There is a sample config
file you can use as a basis, but the structure is pretty basic:

	{
	  "time_limit": 0,
	  "jekyll_path": "/usr/local/bin/jekyll",
	  "git_path": "git",
	  "projects_root": "/var/scratch",
	  "sites": {
    	"https://github.com/user/repo":{
	      "id": "repo",
	      "jekyll_args": "build -d /var/www/html"
	    }
	  }
	}

Each site you want to deploy should have a corresponding site object entry, keyed by the
repository url in GitHub.

To learn more, check out the 
[PHP Jekyll Post Receive Hook](https://github.com/klcodanr/PHP-Jekyll-Post-Receive-Hook)
in GitHub.