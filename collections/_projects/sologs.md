---
section: projects
layout: project 
style-sheets: [default, project-page]
title: sologs
year: 2026
priority: 6
github: https://github.com/RyanVNgo/sologs
overview: Server Application
tags:
    - C++
    - CMake
    - SQLite
    - HTTP
blip: >
    A lightweight HTTP logging server
---

**sologs** is a logging server build in C++ using Drogon as the HTTP
framework and SQLite for the database.

This page will briefly go over what I got out of the project and some
notes about it's development.

Exacting details about implementation or usage will not be covered here.
However, if you're still curious about some of that, then you can take a
look at it's [github]({{ page.github }}).


## Reason

My goal, at the time of developing the project, was to improve my skills
in developing C++ applications.

I believe one of, if not, the best ways to improve is to simply build,
no matter complex or simple it is, so long at you learn something new out 
of it. This project is an example of that.

I went for a back-end like application that exposes a REST-like API and
interacts with a database. These are two things I've never direclty worked
with in C++ so I used this project as an environment to learn more about
it.


## Some Details

### HTTP Framework

sologs, at the time of writing (2026-06-16), uses Drogon as the HTTP
framework which honestly handles a significant amount of the networking. 

As a result, I may modify the implemention to use a low-level networking
library like [Asio](https://think-async.com/Asio/) and provide the
implementation myself. It will very likely be worse than Drogon and other
HTTP frameworks but it would give me hands-on experience with topics like
asynchronous TCP communication and HTTP parsing.


### Database

The database I'm using for the project is SQLite, specifically with the
sqlite3 library.

I already have experience writing SQL and communicating to a database
with code, I just haven't done it yet in C++.

The implementation was straight forward enough but I think a good amount
of work is still left to improve the performance of the end-to-end data
pipeline.


### Architecture, Build, & Testing

To facilitate better testing and extensibility, I split the application
into multiple components that each get built into static libraries
and linked together to create the full application.

This doesn't necessary provide much benefit for the application itself
but it did make testing much easier.

By making each major component compile to a static library, linking the
components to the corresponding tests is fairly trivial.

Additionally, I followed a dependency injection pattern with interfaces
to allow components to decouple from each other. In the tests, any
component with depdencies can just get mocks instead.

This does add more boilerplate to the code but that was a tradeoff I was
willing to make in this case.


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
would've already written. And I'd know since I reviewed everything it wrote
and would sometimes adjust what it after the fact if it did something
not to my liking.

I could've spent time extensively setting up an agent to write code to
my liking but I had no particlar interest in doing so.


## Future Development

At the time of writing, there are some additional features and performance
improvements I'd like to implement so those may come in the near future.

Additionally, as mentioned before, I may use this project as the environment 
to learn more about networking and HTTP handling by replacing Drogon 
with a custom implementation, supported by [Asio](https://think-async.com/Asio/).

