---
section: posts
layout: post
style-sheets: [default, syntaxHL]
title: Game Engine - 5 | No More Singletons
tags:
    - C++
    - Software Design
---

So far, the major components of my engine are implemented as singletons, 
namely the window, renderer, and debugger. Even the voxel mesh data is 
implemented as a singleton.

I went with this design pattern based on the idea that each of these
components would only ever have one instance. However, there are some 
practical issues with singletons that, although I thought wouldn't matter 
for reasons I'll go over later, ultimately led me to remove them entirely.

This post will go over those reasons, how I changed the code structure, and
why I think it's better now than it was before.


## What is a Singleton?

In short, a singleton is a creational design pattern that ensures only one
instance of a class exists and that this instance is globally accessible.

This usually involves modifying the class in a way where you delete or obfuscate 
the constructor and present a method the user calls to initialize or obtain
(or both like with lazy initialization) the instance. That instance often being 
some static object bounded within some scope or field.

### How I Did It

My original implementations took a slightly different approach where I declared 
a global static pointer within the component's source file, called `sg_window`
for the following example.

The `init()` and `shutdown()` methods then provide explicit control of when the 
singleton is created and destroyed.

And a `get_instance()` method provided reference to the singleton.

{% highlight cpp %}
// @file    window.h


namespace Window {
    // Our singleton Class
    class Window {
        public:
            int width();
            int height();
            // ...
            // ...

        private:
            // Obfuscated constructor and destructor
            Window();
            ~Window();
    };

    // public interface to interact with the singleton
    void init();
    Window& get_instance();
    void shutdown();
}
{% endhighlight %}

{% highlight cpp %}
// @file    window.cpp
// The implementation shown here is simplified.

#include "window.h"

namespace Window {
    // Pointer ("container") to our singleton
    static Window* sg_window = nullptr;

    // Initialize the singleton
    void init() {
        assert(!sg_window);
        sg_window = new Window();
        // window initialization stuff
        // ...
        // ...
    }

    // Obtain a reference to the singleton
    Window& get_instance() {
        assert(sg_window);
        return *sg_window;
    }

    void shutdown() {
        assert(sg_window);
        delete sg_window;
    }
}
{% endhighlight %}


## The Problem

Preface stuff ...

### Obscure Initialization

Content ...

### Testing

Content ...


## Refactoring



