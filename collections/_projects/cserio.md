---
section: projects
layout: project 
style-sheets: [default, project-page]
title: CSERIO 
year: 2026
priority: 5
github: https://github.com/RyanVNgo/CSERIO
blip: >
    An interface to SER format image captures for C programmers.
---

{% highlight C %}
#define CSERIO_IMPLEMENTATION
#include "cserio.h"

int main(void) {
    int status = 0;
    serfile* my_ser = NULL;

    ser_open_file(
            &my_ser,
            "/home/ryanvngo/Downloads/mars_capture.ser",
            READONLY,
            &status
    );
    if (status) {
        fprintf(stderr, "Error opening ser: %d\n", status);
        exit(EXIT_FAILURE);
    }

    int32_t frame_count = 0;
    ser_get_frame_count(my_ser, &frame_count, &status);
    if (status) {
        fprintf(stderr, "Error getting frame count: %d\n", status);
        exit(EXIT_FAILURE);
    }
    printf("Frame count: %d\n", frame_count);

    ser_close_file(my_ser, &status);
    if (status) {
        fprintf(stderr, "Error closing ser: %d\n", status);
        exit(EXIT_FAILURE);
    }

    return EXIT_SUCCESS;
}
{% endhighlight %}

<sub>*Updated to Version 2 in 2026*</sub>

I built CSERIO because I noticed a lack of a C/C++ library that
provided an interface to interact with SER format image captures.

SER files are essentially like raw video captures but were designed 
primarily for use in astrophotography in capturing videos of things
like planets and sometimes deep sky objects.

It's a fairly well supported image format within the space and has 
a simple internal structure. It has a fixed width header followed
by image data and ending with an optional trailer.

If you're unfamiliar, standard image captures in both astrophotography
and oftentimes the professional astronomy space utilize fit/fits format
image captures. This format already has a well built and documented
library interface called CFITSIO, hence the name for this project.

Provided that fit/fits format images are fairly complicated in
construction, supporting variable width headers and multidimensional
layering, the need for an interface to the relatively simplistic
SER format image capture is understandably less.

The project started development in 2024 but I had stopped a few months 
later after losing interest. In early 2026, I revived development and 
changed a significant amount the implementation resulting in a major
version change to 2.0.

