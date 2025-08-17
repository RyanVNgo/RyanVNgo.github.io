---
section: home
layout: default 
style-sheets: [default, index, post-list, project-list]
author: Ryan Ngo
---

<h1>Hi, I'm <span class="title-highlight">{{ page.author }}</span></h1>

A recent Comp-Sci graduate from San Diego State University that likes 
writing software, especially for projects or systems that aim to benefit 
people, our world, or our understanding of everything around us.

Currently improving my knowledge and skills in C++ —  I like the language,
encourages me to write cleanly (cause it can get messy), and is pretty fast.

Beyond that, I've done some ML/AI development in Python + PyTorch/NumPy, and 
more general stuff in Golang and Java. I guess I also know HTML and CSS given 
this website if that counts for anything.

Below, you can check out some of the projects I've built or read some of the 
posts I've made.

<div class="list-heading">
    <h2>Recent Projects</h2>
    <a href="{{ site.docs[1].url }}"> more -></a>
</div>
{% assign project-list-length = 3 %}
{% include project-list.html %}

<div class="list-heading">
    <h2>Recent Posts</h2>
    <a href="{{ site.docs[2].url }}"> more -></a>
</div>
{% assign post-list-length = 3 %}
{% include post-list.html %}
