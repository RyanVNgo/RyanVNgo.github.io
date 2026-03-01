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

In 2024, I was experimenting with developing software that could display
`.fits` format images. This format is used extensively in the astronomy space
for storing a wide range of astronomical data. CFITSIO is a predominant library
for providing IO operations for the format and is what I used in my software.

However, another format, used mostly by amateur astrophotographers, is the `.ser`
file format. The format is also intended to store astronomical data but serves 
a different purpose and is much simpler in construction. Naturally, I went looking
for a library that provided IO operations for this format but couldn't find
anything. That's when I decided to try building a library similar to CFITSIO for
SER files.

The project started development in 2024 but I had stopped a few months later after 
losing interest. In early 2026 I revived development with interface adjustments and
completion of necessary IO routines. The library now provides adequate routines 
to create, read, write, and modify `.ser` format files.


