---
section: home
layout: default 
author: Ryan Ngo
---

# Hi, I'm {{ page.author }}

A software developer making simple, fast, functional software.

Current undergraduate at San Diego State University.

Recently messing around with C/C++ along with a bit of CUDA.
Also familiar with Java, Python, and a bit of Go.

Below, you can check out some of the projects I've built or you 
can read some of the posts I've made on whatever tf idk the title
will tell you.

## Recent Projects
{% assign project-list-length = 2 %}
{% include project-list.html %}


## Recent Posts
{% assign post-list-length = 2 %}
{% include post-list.html %}
