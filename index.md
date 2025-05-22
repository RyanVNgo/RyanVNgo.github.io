---
section: home
layout: default 
style-sheets: [default, post-list, project-list]
author: Ryan Ngo
---

<h1>Hi, I'm <span class="title-highlight">{{ page.author }}</span></h1>

I do computer stuff. Programming in my free time. Critiquing documentation in my spare time. 

Recent gradauate from San Diego State University with a B.S. in Computer Science.

Been messing around in developing and training computer vision models in Python/PyTorch.
Beyond that, I like C++ and C and I'm familiar with Java.

Mostly interested in software/program optimization because I hate it when
shits slow.

Below, you can check out some of the projects I've built or you 
can read some of the posts I've made on whatever tf idk the title
will tell you.

## Recent Projects
{% assign project-list-length = 2 %}
{% include project-list.html %}


## Recent Posts
{% assign post-list-length = 2 %}
{% include post-list.html %}
