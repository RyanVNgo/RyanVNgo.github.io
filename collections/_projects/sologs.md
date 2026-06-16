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
framework and sqlite3 for the database.

This page will briefly go over what I got out of the project than the 
project itself as the details of it are mostly trivial.

But if you are curious about those details, then you can visit
it's [github]({{ page.github }}).


## Reason

The project was built for the sole purpose of improving my skills in
developing C++ applications. And while yes, this is also the first C++
project where I've worked with an HTTP framework and a database, those
are somewhat ancillary to any primary goal. The application could have
fundamentally been anything else.

## Practices and Learnings

There were a number of skills/practices that I learned/adopted while
developing this project. Some were intentional while other were learned
along the way, especially since I was consuming a lot of C++ content
in the interim. I'll only mention some of the more important ones here.


### Build System

I had already been using CMake to manage my C++ projects and this was no
different. However, the way in which I built the application, managed the 
files, and setup the options was fairly lacking.

The first thing I did remove unnecessary options from the CMake file.
These were mainly just setting exporting compile commands and the compiler. 

{% highlight cmake %}
set(CMAKE_EXPORT_COMPILE_COMMANDS   ON) # <- Remove this
set(CMAKE_CXX_COMPILER             g++) # <- Remove this
{% endhighlight %}

Evidently, not everyone needs `compile_commands.json` in their build and
I shouldn't be forcing that along with the compiler in the `CMakeLists.txt`
file.

Additionally, a practice I adopted for this project was having multiple
`CMakeLists.txt` files across the project that each manage individual
their own component of the project.

{% highlight shell %}
# As of 2026-06-15
src/
  api/
    CMakeLists.txt
    ...
  crypto/
    CMakeLists.txt
    ...
  db/
    CMakeLists.txt
    ...
  domain/
    CMakeLists.txt
    ...
  service/
    CMakeLists.txt
    ...
  utils/
    CMakeLists.txt
    ...
  CMakeLists.txt
  main.cpp
tests/
  CMakeLists.txt
  ...
CMakeLists.txt
LICENSE
README.md
{% endhighlight %}

It may be a bit overly verbose to organize the project in this way but
it generally helped with next practice I adopted; compiling these components 
into static/interface libraries and linking them together for the main 
application.

While I don't think there was an inherent benefit to building the application
in this way, it did, as I believe, make testing each component far easier.

Since each major component is compiled into a static library, if I wanted
to test a component, I just needed to link to it when building the
corresponding tests.


### Testing

Building on the modifications I made with the build system, there was one
notable practice implemented in the source code that made testing easier.

Utilizing interfaces for components with dependencies.

{% highlight cpp %}
/* Example of one interface from the project (2026-06-15) */
class ILogRepository {
    public:
        virtual ~ILogRepository() = default;

        virtual auto insert(const LogEntry& entry) -> void = 0;

        virtual auto insert_batch(
                const std::vector<LogEntry>& entries
        ) -> void = 0;

        [[nodiscard]] virtual auto get_all(
                FilterParams params
        ) const -> std::vector<LogEntry> = 0;
};
{% endhighlight %}

Many components in my application follow a dependency injection pattern
such that the components cannot exist without their dependencies.

An issue that can arise with this pattern are dependency chains, where 
a component relies on one dependency, which relies on another, and so on.

By always defining the dependency as an inteface, you can create mocks
during testing if the concrete implementation is not needed.

Coupling that with tools that can take advantage of this, like GoogleTest
in my case, you can test for interactions on those mock dependencies from 
the dependent class.

However, this does result is more boilerplate around the codebase so
that's something to keep in mind.


### Explicitness & Styling

This isn't too notable but I made various adjustments to my style of writing
C++ code. Some are purely stylistic while others are more applicable.

An applicable example is making use of `[[nodiscard]]`, `const`, and
`noexcept`.

{% highlight cpp %}
/* inside some class */

[[nodiscard]] bool like_this() const noexcept;

bool not_like_this();

{% endhighlight %}

It helps make member functions more explicit and directs their usage.

Another adjustment is the use of trailing return type syntax.

{% highlight cpp %}
/* inside some class */

[[nodiscard]] auto more_like_this() const noexcept -> bool;

[[nodiscard]] bool not_actually_like_this() const noexcept;

{% endhighlight %}

This falls in both style and applicability. There are real reasons for using
this type of sytax (otherwise it wouldn't have been added) like allowing
simpler template definitions and minimizing scope qualifiers.

They also help stylistically since visual alignment is easier in certain
regards if that's of concern.

{% highlight cpp %}

/* no alignment */
[[nodiscard]] const std::vector<int>& get_vector() const noexcept;
[[nodiscard]] bool get_bool() noexcept;
[[nodiscard]] std::string get_string() const;

/* better alignment */
[[nodiscard]] const std::vector<int>&   get_vector() const noexcept;
[[nodiscard]] bool                      get_bool() noexcept;
[[nodiscard]] std::string               get_string() const;

/* trailing return, a bit better alignment by default */
[[nodiscard]] auto get_vector() const noexcept -> const std::vector<int>&;
[[nodiscard]] auto get_bool() noexcept -> bool;
[[nodiscard]] auto get_string() const -> std::string;

/* could align even more */
[[nodiscard]] auto get_vector() const noexcept  -> const std::vector<int>&;
[[nodiscard]] auto get_bool() noexcept          -> bool;
[[nodiscard]] auto get_string() const           -> std::string;

/* certain situations like this can still be awkward */
[[nodiscard]] auto get_vector() const noexcept  -> const std::vector<int>&;
[[nodiscard]] auto get_bool() noexcept          -> bool;
[[nodiscard]] auto get_string() const           -> std::string;
auto get_nothing() const noexcept -> void;

/* you could do this I suppose */
[[nodiscard]] auto get_vector() const noexcept  -> const std::vector<int>&;
[[nodiscard]] auto get_bool() noexcept          -> bool;
[[nodiscard]] auto get_string() const           -> std::string;
              auto get_nothing() const noexcept -> void;

/* even more alignment? IDK */
[[nodiscard]] auto get_vector()     const noexcept  -> const std::vector<int>&;
[[nodiscard]] auto get_bool()       noexcept        -> bool;
[[nodiscard]] auto get_string()     const           -> std::string;
              auto get_nothing()    const noexcept  -> void;

{% endhighlight %}

It's not perfect but I like the trailing return syntax. It also aligns more 
with languages like Rust and Go if you work with those (and I might in the
future).


### Drogon and sqlite3

I only make a note of these because I don't necessarily think learning
specific libraries is anything special. Libraries change from project to
project and sure, I have these in the back of my head if I ever need them,
but I don't put too much value in it.


## Agentic Coding 

This is the first project where I (somewhat) actively used a coding agent
to help build the applcation. However, it's usage was fairly constrained
and highly supervised.

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

I could've spent time extensively setting up an agent to my liking but I 
have no particlar interest in that at this point.


## Future Development

At the time of writing (2026-06-15) there are some important/useful features
that should be implemented and likely will.

Additionally, I may use this project as the environment to learn more about
networking and HTTP handling, likely replacing Drogon with a custom built
component supported by [Asio](https://think-async.com/Asio/) or 
[Boost.Beast](https://github.com/boostorg/beast).

