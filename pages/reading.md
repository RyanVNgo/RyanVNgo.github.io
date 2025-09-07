---
section: reading
layout: default 
style-sheets: [default, book-list]
author: Ryan Ngo
---

# Readings
---

<div class="book-list">
    {% assign sorted_books = site.readings | sort: "date-finished" | reverse %}
    {% for book in sorted_books %} 
    <div class="book-card">
        <img class="cover-image" src="{{ book.cover-image }}">
        <div class="content">
            <hgroup class="title-group">
                <h2>{{ book.title }}</h2>
                <h3>{{ book.author }}</h3>
                <p>Date Finished: {{ book.date-finished }}</p>
            </hgroup>
            {{ book.content }}
        </div>
    </div>
    {% endfor %}
</div>


