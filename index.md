---
section: home
layout: default 
style-sheets: [default, index]
author: Ryan Ngo
---

<span class="eyebrow">Software Developer & CS Grad</span>
<h1 class="home-title">
    Hi, I'm {{ site.author }} and I'm<br>
    <span>Building Software for... <i>something</i>...</span>
</h1>

I currently spend my time building personal software projects, some of 
which are featured below alongside posts about them and other topics I 
find interesting.

Outside of software: Formula 1, tech, astronomy, and K-pop. <sub><i>(stan NMIXX)</i></sub>

<div class="info-block">
    <div class="info-block__text">
    <span>Now</span> - improving skills in developing software in C++
    </div>
</div>

<div class="list-heading">
    <span class="eyebrow">Projects</span>
    <a class="list-heading__link" href="{{ site.docs[0].url }}">all projects -></a>
</div>
{% assign project-list-length = 4 %}
{% include project-list.html %}


<div class="list-heading">
    <span class="eyebrow">Posts</span>
    <a class="list-heading__link" href="{{ site.docs[1].url }}">all posts -></a>
</div>
{% assign post-list-length = 3 %}
{% include post-list.html %}

