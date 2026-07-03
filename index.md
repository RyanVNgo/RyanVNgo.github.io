---
section: home
layout: default 
style-sheets: [default, index]
author: Ryan Ngo
---

<div class="title-section center-text">
    <span id="title-section__overview" class="eyebrow">
      Software Developer & CS Grad
    </span>
    <h1 id="title-section__title">
      Hi, I'm {{ site.author }},<br>
      Welcome to My Personal Website.
    </h1>
</div>

I'm a software developer based in California who enjoys building software
with an emphasis on simplicity, performance, and extensibility.

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

