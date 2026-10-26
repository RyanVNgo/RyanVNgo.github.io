---
section: projects
layout: project 
style-sheets: [default, project-page]
title: sologs
year: 2026
priority: 6
github: https://github.com/RyanVNgo/sologs
overview: Server Application
status: archived
tags:
    - C++
    - CMake
    - SQLite
    - HTTP
blip: >
    A lightweight HTTP logging server
---

<blockquote class="blockquote-note" markdown="1">
  **Archived (Sep 2, 2026) — no longer maintained.** 

  For more information, please visit the project's
  [github repository]({{ page.github }}).
</blockquote>

**sologs** is a logging server build in C++ using Drogon as the HTTP
framework and SQLite for the database.

This page will briefly go over some details about the project and provide
various notes about it's development.

Exact details about implementation or usage will not be covered here.
If you're curious about that, then you can take a look at it's
[github]({{ page.github }}).


## Reason

My goal was to improve my skills in developing C++ applications.

I went for a back-end like application that exposes a RESTful API and
interacts with a database. These are two things I've never directly worked
with in C++ so I used this project as an environment to learn more about it.


## Some Details

### HTTP Framework

sologs (2026-06-16) uses Drogon as the HTTP framework which handles a 
significant amount of the implementation details regarding networking 
and workload distribution across multiple threads. 

While this simplified this portion of development, I felt dissatisfied
by how little I understood about the details abstracted away by Drogon.
I may return to the project to refactor the networking component with
my own implementation and improved understanding, though I may very well
apply that work to some future project.


### Database

The database is SQLite, specifically with the sqlite3 library.

I already have experience writing SQL and communicating to a database
through software, I just haven't done it yet in C++.

Implementation was straight forward enough but I think significant work 
can be done to improve the performance of the end-to-end data
pipeline.


### Architecture, Build, & Testing

To facilitate better testing and extensibility, I split the application
into multiple components that each get built into static libraries
and linked together to create the full application.

This doesn't necessary provide much benefit for the application itself
but it did make testing much easier.

By making each major component compile to a static library, linking the
components to the corresponding tests is fairly trivial.

Additionally, I conformed to dependency injection with interfaces
to allow components to decouple from each other. In the tests, any
component with depdencies can get mocks instead.

This does add more boilerplate to the code but that was a tradeoff I was
willing to make.


## Agentic Coding 

This is the first project where I (somewhat) used a coding agent to help 
build the applcation. However, it's usage was fairly constrained and 
highly supervised.

I may make a proper post regarding this topic as a whole but in short, I 
used [Opencode](https://opencode.ai/) with their default Big Pickle model
to write some tests, adjust some interfaces, make some commit messages,
and write the `README.md`.

Emphasis on the *some* for those mentioned as it was very little and much 
of my direction led to the model having next to no liberty on how to 
write the code. I essentially used it as a faster way of writing what I 
would've already written.

## Future Development

At the time of writing, there are some additional features and performance
improvements I'd like to implement so those may come in a future version.

