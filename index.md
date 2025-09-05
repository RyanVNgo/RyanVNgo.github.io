---
section: home
layout: default 
style-sheets: [default, index, post-list, project-list]
author: Ryan Ngo
---

<h1>Hi, I'm <span class="title-highlight">{{ page.author }}</span></h1>

And welcome to my personal website. A place where I provide info about my
projects, publish write-ups, post notes, and share whatever else I feel
like putting out there.

I recently graduated with a B.S. in Computer Science from San Diego State University
and I'm interested in building software that intends to benefit people, our world, 
and our understanding of everything around us.

Right now, I'm learning raylib and trying my hand at devloping games from 
scratch. I've also entered myself into a game jam, specifically [GBJAM 13](https://itch.io/jam/gbjam-13). 
It ends on September 22nd, 2025 so I should (hopefully) have a project page 
and write-up regarding how it went shortly after.

Below, you can check out some of the more recent projects I've built and 
write-ups I've made.

<br>

<div class="list-heading">
    <h2>Recent Projects</h2>
    <a href="{{ site.docs[1].url }}"> more -></a>
</div>
{% assign project-list-length = 2 %}
{% include project-list.html %}

<div class="list-heading">
    <h2>Recent Posts</h2>
    <a href="{{ site.docs[2].url }}"> more -></a>
</div>
{% assign post-list-length = 3 %}
{% include post-list.html %}
