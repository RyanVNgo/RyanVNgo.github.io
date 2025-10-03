---
section: posts
layout: post
style-sheets: [default, post-page]
title: Game Engine - 1 | Start
---

With how abysmal recent games have been in terms of performance to visual quality, I've been wanting
to make a game with an emphasis on performance. There's a lot of different ways I could have gone 
about doing this but I decided to take the approach of making everything from scratch (for the most part). 
This is a very inefficient approach to making a game but my goal is the engine and the optimizations
made within and around it.

And so this post serves as the first of (hopefully) many documenting the process of making a game engine.


## Scope

I'll first point out that I'm not necessarily making a game engine in the way that Unreal, Unity, and Godot
are game engines. It's more like I'm making a game that runs on an engine that I will also be making. This
is to help narrow the scope and focus on the primary goal of making a performant and optimized game + engine.

With that being said, the idea is to make a voxel-based strategy-like game with an orthographic projection
perspective similar to Foxhole. That's all I have for the actual game itself right now but it's enough
to get started on the engine. 

And for the engine, I plan on writing it all in C++ with GLFW, OpenGL, and Dear ImGui. GLFW and OpenGL
are quite popular options for window management and graphics and Dear ImGui is a popular immediate 
mode UI tool commonly used for things like data visualization and debugging for game engines. 
I already have some experience with Dear ImGui from some other projects I've made but I'm fairly 
new to GLFW and OpenGL.


## Work

So far, I followed and experimented around with the code developed in an OpenGL series made by [The Cherno](https://www.youtube.com/@TheCherno).
It goes over some important concepts while providing the foundation for the graphics component of an engine
and so I'll be using this as a starting point for this project. In fact, by this point I've already gone
through the entire series and have a 3D-scene to show for it. 

![Graphics Test]({{ site.posts-imgs-dir }}/game-engine/image_1.webp)

The image doesn't really convey it but the camera is moveable and has mouse look controls. The ImGui
panel is also there showing the FPS (vsync is on), mouse position, and camera rotation.

The implementation of this entire scene is extremly crude so much of it will be thrown away but it's a 
good start at least.

There's much more to implement from here like window management, user input, game loop, etc.,
but those will come with time and when they do, I'll make sure to document them in the posts to come.

