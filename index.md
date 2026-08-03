---
section: home
layout: default 
style-sheets: [default, index]
author: Ryan Ngo
---

<div id="home-header">
  <div id="home-header__text">
    <h1 id="home-header__title">
      Hi, I'm <span>{{ site.author }}</span><br>
    </h1>
    <h2>
      A software developer based in California building tools and
      applications with a focus on design, performance, and extensibility.
    </h2>
  </div>
  <img class="light-background" id="home-header__pic" src="/assets/images/dot_portrait_2.png">
</div>

I currently spend my time building personal software projects, some of 
which are featured below alongside posts about them and other topics I 
find interesting.

Outside of software: Formula 1, tech, astronomy, and K-pop. <sub><i>(stan NMIXX)</i></sub>

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

