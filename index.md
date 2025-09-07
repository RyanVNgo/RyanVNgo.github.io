---
section: home
layout: default 
style-sheets: [default, index, post-list, project-list]
author: Ryan Ngo
---

<h1 id="home-title">Hi, I'm <span>{{ page.author }}</span></h1>

And welcome to my personal website. A place where I provide info about my
projects, publish write-ups, post notes, and share whatever else I feel
like putting out there.


I recently graduated with a B.S. in Computer Science from San Diego State 
University and I'm interested in building software to support research 
and discovery, with the intention of advancing knowledge and improving
human livelihood.

Outside of programming, I like tech, Formula 1, gaming, astrophotography,
and K-pop. <sub><i>(stan Aespa)</i></sub>

Currently learning 
<a href="https://www.raylib.com/" target="_blank">raylib</a>
and plan on participating in
<a href="https://itch.io/jam/gbjam-13" target="_blank">GMJAM 13</a>.


<div id="home-social-links">
    <a class="social-button" href="{{ site.github }}" target="_blank">
        <img src="/assets/images/Github_Logo.png" alt="Github">
        <div>Github</div>
    </a>
    <a class="social-button" href="{{ site.linkedin }}" target="_blank">
        <img src="/assets/images/LinkedIn_Logo.png" alt="Github">
        <div>Linkedin</div>
    </a>
    <a class="social-button" href="mailto:{{ site.email}}" target="_blank">
        <img src="/assets/images/Mail_Logo.png" alt="Github">
        <div>vanryan711@gmail.com</div>
    </a>
</div>


<div class="list-heading">
    <h3>Projects</h3>
    <a href="{{ site.docs[1].url }}">more</a>
</div>
<hr>
{% assign project-list-length = 2 %}
{% include project-list.html %}


<div class="list-heading">
    <h3>Posts</h3>
    <a href="{{ site.docs[2].url }}">more</a>
</div>
<hr>
{% assign post-list-length = 3 %}
{% include post-list.html %}

