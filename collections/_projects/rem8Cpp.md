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
    A CHIP-8 emulator made in C++ with an ImGui backend of GLFW and OpenGL 3.
---

![IBM logo test ROM running]({{ page.images[0] }})

This is just an extension of [rem8C](https://github.com/RyanVNgo/rem8C) but developed in C++
and given some quality of life improvements like a better loading system, 
controllable clock rate, and diagnostics to monitor emulator state. 


## From rem8C to rem8C++

Since C can essentially be ported over to C++ directly, much of the 
implementation is the same. If you want to read more on that, you can check 
out the project page on the original implementation that's also on this site, 
just named rem8C.

Much of the porting just involved wrapping the emulator within a class and 
providing a series of functions to act as an interface to the emulator.

There are also some other developmental improvements like an improved build 
system with CMake, unit testing with GoogleTest, and integrating tests with 
Github actions.


## ImGui

I decided to try a proper GUI library for this project and after doing some 
research, landed on [Dear ImGui](https://github.com/ocornut/imgui).
It's an immediate mode GUI library with straightforward integration, minimal 
dependencies, and a simple design pattern.


## Dependency Management

This is the first project where I used a dedicated package manager to provide 
project dependencies. I chose [vcpkg](https://github.com/microsoft/vcpkg)
because it seems quite popular and for my first go, I think it was fine to
run with.

After adding vcpkg as a submodule and doing a bit of learning, I managed to 
integrate vcpkg with CMake to provide the necessary dependencies with little 
to no extra steps in the build process.


