---
section: home
layout: default 
style-sheets: [default, index, post-list, project-list]
author: Ryan Ngo
---

<h1>Hi, I'm <span class="title-highlight">{{ page.author }}</span></h1>

I do computer stuff. Mostly writing code. Documentation is chill too.

Recent gradauate from San Diego State University with a B.S. in Computer Science.

Been trying to improve my knowledge and skills in C++ development, namely for
game engines and high performance applications. Aside from that, I've done some
ML/AI development in Python + PyTorch/NumPy, webserver and Docker stuff in Golang,
and more general stuff in Java. I guess I also know HTML and CSS given this website
if that counts for anything.

Mostly interested in software/program optimization because I hate it when
shits slow.

Below, you can check out some of the projects I've built or you 
can read some of the posts I've made on whatever tf idk the title
will tell you.

<div class="list-heading">
    <h2>Recent Projects</h2>
    <a href="{{ site.docs[1].url }}"> more </a>
</div>
{% assign project-list-length = 3 %}
{% include project-list.html %}

<div class="list-heading">
    <h2>Recent Projects</h2>
    <a href="{{ site.docs[2].url }}"> more </a>
</div>
{% assign post-list-length = 3 %}
{% include post-list.html %}
