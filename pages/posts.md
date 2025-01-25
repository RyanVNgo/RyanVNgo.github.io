---
section: posts
layout: default 
author: Ryan Ngo
---

<ul id="post-list">
    {% for post in site.posts %}
        <li>
            <div class="post-date">
                {{ post.date | date: "%Y-%m-%d" }}&emsp;
            </div>
            <h3 class="post-title">
                <a href="{{ post.url }}">
                    {{ post.title }}
                </a>
            </h3>
            <p class="post-excerpt">
                {{ post.content | strip_html | truncatewords: 20 }}
            </p>
        </li>
    {% endfor %}
</ul>

