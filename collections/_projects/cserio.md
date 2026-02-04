---
section: projects
layout: project 
style-sheets: [default, project-page]
title: CSERIO 
year: 2024
priority: 1
github: https://github.com/RyanVNgo/CSERIO
blip: >
    An interface to SER format image captures for C programmers.
---

{% highlight c %}
#include <stdio.h>
#include "cserio.h"

/* this example omits error checking */
int main(int argc, char* argv[]) {
    int status = 0;
    serfile* ser_capture;

    ser_open_file(
        &ser_capture,
        "/path/mars_capture.ser",
        READONLY, 
        &status
    );

    unsigned long frame_size = 0;
    ser_get_frame_byte_size(ser_capture, &frame_size, &status);

    char* frame_buff = malloc(frame_size);
    ser_read_frame(ser_capture, frame_buff, 0, &status);

    /* do stuff with frame data */

    ser_close_file(ser_capture, &status);
    free(frame_buff);

    return 0;
}
{% endhighlight %}

I built CSERIO because I noticed a lack of any real library that
provided an interface to interact with SER format image captures.

SER files are essentially like raw video captures but were designed 
primarily for use in astrophotography in capturing videos of things
like planets and sometimes deep sky objects.

It's a fairly well supported image format within the space and uses
a fairly simple architecture. It has a fixed width heading followed
by image data and ending with an optional footer.

If you're unfamiliar, standard image captures in both astrophotography
and oftentimes the professional astronomy space utilize fit/fits format
image captures. This format already has a well built and documented
library interface called CFITSIO, hence the name for this project.

Provided that fit/fits format images are fairly complicated in
construction, supporting variable width headers and multidimensional
layering, the need for an interface to the relatively simplistic
SER format image capture is understandably less.

Still, I've built the library and it's still undergoing development.
While it may only see use in personal projects since I'd like to develop
some software for the astrophtography space, it's still a nice
endeavor in developing and documenting my own libraries.


