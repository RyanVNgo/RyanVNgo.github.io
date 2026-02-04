---
section: projects
layout: project
style-sheets: [default, project-page]
title: rem8C++
year: 2025
priority: 4
github: https://github.com/RyanVNgo/rem8Cpp
images:
    - https://raw.githubusercontent.com/RyanVNgo/rem8Cpp/refs/heads/main/images/IBM_test.png
blip: >
    A CHIP-8 emulator made in C++.
---

![IBM logo test ROM running]({{ page.images[0] }})

This is just an extension of [rem8C](https://github.com/RyanVNgo/rem8C) but developed in C++
and given some quality of life improvements like a better loading system, controllable
clock rate, and diagnostics to monitor emulator state. 

Since C can be practically ported over to C++ directly, much of the implementation is the same.
If you want to read more on that, you can check out the project page on the original implementation
that's also on this site, just named rem8C.

Much of the porting simply involved wrapping the emulator within a class and providing a series of
functions to act as an interface to the emulator.

There's also some other developmental improvements like an improved build system with CMake, adding
unit testing with GoogleTest, and integrating that with some Github actions for CI/CD.


## More Needed Improvements

Although the direct usage of the application is nicer, there are series of things I'm still unsatisfied with.

First is portability. I don't think I've developed a robust enough framework to provide both usage and 
development across different systems. I'm experimenting with the vcpkg dependency manager to manage 
required packages, namely SDL2 and OpenGL. Right now, these dependencies are required to get the application
running since all users need to build the project from source. And I can't expect everyone that wants
to use the application to have the knowledge to both install the dependencies and then troubleshoot if
anything goes wrong. That's too much friction that I'm unhappy with so I definitely want to resolve this.

Second is accuracy. This is something I mentioned with the original implementation and given I just ported
it over, it all essentially carried over. Although my implementation passed the test ROMs, certain CHIP-8
ROMs beyond those just don't seem to work properly. Fixing these issues will require much more research
on implementation details.


