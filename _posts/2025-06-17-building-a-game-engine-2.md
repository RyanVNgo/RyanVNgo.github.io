---
section: posts
layout: post
style-sheets: [default, syntaxHL]
title: Building a Game Engine - 2 | Organization
tags:
    - C++
    - OpenGL
    - GLFW
---

## Structure

{% highlight shell %}
src/
├ main.cpp
├ game/
│  └ game.cpp
├ engine/
│  ├ window.cpp
│  ├ renderer.cpp
│  ├ errors.cpp
│  └ graphics/
│     ├ shader.cpp
│     ├ texture.cpp
│     ├ index_buffer.cpp
│     ├ vertex_buffer.cpp
│     └ vertex_buffer_layout.cpp
└ vendor/
   ├ glm/
   ├ imgui/
   └ stb_image/
{% endhighlight %}

I immediately wanted to organize the code I already had from my crude implementation made earlier.
This involved moving the `shader`, `texture`, `index_buffer`, `vertex_buffer`, `vertex_buffer_layout`, and 
`renderer` files into a dedicated `engine/` folder. I then further put these files, aside from `renderer`
into a subsequent `graphics/` folder.

Then I moved some of the window initialization and operational stuff into a new `window` file within
`engine/` and the OpenGL error checking from `renderer` to a separate `error` file.

Finally, I created a `game/` folder which will contain the source code for the game. For now, I put
some placeholder `game` files which provide some very basic functionality.


## Abstraction

{% highlight cpp %}
int main(void) {
    Window::init("Test");
    auto& window = Window::get_instance();
    Renderer::init();
    auto& render = Renderer::get_instance();
    Game::init();
    auto& game = Game::get_instance();
    
    while (!window.should_close()) {
        window.poll_events();
        game.update();
        renderer.render();
        window.swap_buffers();
    }

    Game::shutdown();
    Renderer::shutdown();
    Window::shutdown();
    return 0;
}
{% endhighlight %}

This is what the main function now looks like. Under the context of this project, I feel like the main
function should only really initialize major components, make them run, and handle shutdown. Now this
current implementation doesn't strictly follow this as it's also responsible for the main update
and render loop but this may change in the future.

Another note to make is how I implemented the window, renderer, and game objects. First is the fact that
they're objects in the first place. I wanted to ensure that only one instance of a window, renderer,
and game could be made and any attempt to do so multiple times would fail. 

The current approach involves defining classes for these three components but removing the constructors 
and destructors and using static calls like `::init()` to create the global static objects and handle 
other tasks. So essentially singletons. These objects are defined in each of the components primary 
translation unit to keep them from being globally accessible. 

As shown by the main function, I'm calling a `::get_instance()` function that returns a reference to the 
global static object. This allows me to use them more like objects than like a bunch of static function
calls. Through some experimentation, there are some potential annoyances that mainly revolve around the
redundancy of using a class for these representations and trying to figure out the implementation details
so I'm gonna experiment around with this abstraction.


## Next

Probably figuring out how I'm gonna handle rendering. Preferably in a way that allows for parallelism.
We'll see ig.

