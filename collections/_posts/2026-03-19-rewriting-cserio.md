---
section: posts
layout: post
style-sheets: [default, post-page]
title: Rewriting CSERIO
published: false
---

I started developing CSERIO in 2024 after wanting a C library that could
provide IO routines for `.ser` format files in a similar manner to CFITSIO 
with `.fits` format files. However, after writing some routines that provided 
basic operations, I lost interest in developing the library further for 
reasons I don't remember.

Some time has passed since then and after looking back it, I wish I had 
properly completed it, so that's what I've done. I rewrote the entirety of 
the CSERIO library, changing a significant amount of the internal 
implementation and developing a complete range of routines.


## Some of the Problems

### Incomplete Implementation

As stated earlier, I never developed a full range of routines that could
cover the situations one might want when working with SER files. The library 
could only: open/close files, read/write header data, and read image data. 
So creating new SER files, writing image data, and anything involving the 
trailer just didn't exist.

### File Validity

The library didn't enforce any structure or correctness to the data that was
read or written to the SER file. For example, the `ser_open_file` routine 
didn't perform any checks to validate whether the header fields correctly
described the file. On top of that, the write routines could change
header fields in a way that could incorrectly represent the file.

### Unit Tests

I'm not entirely sure why I did this but I chose to write my own utilities
for the unit tests. So instead of using some other, well produced unit
testing library, I made my own. All this really resulted in was more work 
on my end to validate library functionality. 


## Redesign and Improvements

### Consolidation to a Single Header

In the previous implementation, I placed all the defines, structs, and 
function prototypes into a single header file and placed all funciton
definitions in a series of source files. Then, I provided a `Makefile`
which would build the files into a static library file `libcserio.a`.

After learning about other kinds of library constructions, I adjusted
CSERIO to be a single header library.

Now there are only two files to worry about, `cserio.h` and `cserio.c`. The 
header contains all of the source code while the source file just defines
the implementation macro and includes the header.

With this construction, the user can just define the marco and include the 
header to use the library.

{% highlight C %}
#define CSERIO_IMPLEMENTATION
#include "cserio.h"

int main(void) {
    ...
}

{% endhighlight %}

This can cause some issues if this is done in multiple files so the source
file is provided to allow one point of implementation that can be compiled
with the project.

### Complete Suite of Routines

The new suite of routines now provides enough functionality needed to create,
read, and write SER files. This includes more granular read/write
routines for the header, an append routine for writing a new image, and a 
read routine for the trailer.

### Validation

All routines now interact with SER files in a way that ensures validity
through a series of internal checks. Now, malformed SER files can't be opened and 
valid ones can't be malformed.

### Using Check for Unit Tests

I replaced the entire testing implementation with Check and have near complete 
code coverage.


## For the Future

While it was nice to revisit this project, there were definitely some things
to learn from the rewrite.

One is being more thoughtful on the planning stage. Several times during
development, I decided to change the implementation or API because I figured
out some better way to provide some feature. This resulted in major version 
changes that could've been avoided.

And speaking of version changes, another is following more proper semantic 
versioning. When I first "released" CSERIO, I versioned it 1.0.0 meaning any 
subsequent changes to the API would result in a major version change. There's 
nothing *technically* wrong with this but it's probably best to not rack up a 
bunch of major version changes. I'll likely keep future project within the 0.X.X 
stage for as long as major changes occur frequently.

Lastly, developing in smaller, more frequent chunks. This kinda aligns with
the planning point I made earlier but has more to do with overall development
time. The rewrite took much longer than expected and I think if I had paced
myself properly by focusing on completing small chunks one at a time and
continually moving forward, I would've finished the rewrite in a week or two.
Of course, part of the lengthy development time can be attributed to me
working on other things but still.

I might come back to CSERIO again to add more QoL routines, since the current
ones are quite raw, but for now, I'm pretty satisfied with the rewrite.


