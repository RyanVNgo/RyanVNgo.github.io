---
section: home
layout: default 
style-sheets: [default, index]
author: Ryan Ngo
---

<h1 class="home-title">Hi, I'm <span>{{ page.author }}</span></h1>

And welcome to my personal website. A place where I provide info about my
projects, publish write-ups, post notes, and share whatever else I feel
like putting out there.

I recently graduated with a B.S. in Computer Science from San Diego State 
University and I'm interested in building software that advances scientific 
research and discovery, with the goal of expanding human knowledge and
enhancing quality of life.

Outside of programming, I like tech, Formula 1, gaming, astrophotography,
and K-pop. <sub><i>(stan Aespa)</i></sub>

### Now

Getting better at building software in C++ with a focus on desktop
applications. I've been using ImGui so far but I plan on pivoting to Qt.

<br>

<div class="list-heading">
    <h2 class="list-heading__title">Projects</h2>
    <a class="list-heading__link" href="{{ site.docs[1].url }}">more</a>
</div>
<hr>
{% assign project-list-length = 2 %}
{% include project-list.html %}


<div class="list-heading">
    <h2 class="list-heading__title">Posts</h2>
    <a class="list-heading__link" href="{{ site.docs[2].url }}">more</a>
</div>
<hr>
{% assign post-list-length = 3 %}
{% include post-list.html %}

