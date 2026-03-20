---
section: posts
layout: post
style-sheets: [default, post-page]
title: Rewriting CSERIO
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
function prototypes into a single header file and placed all function
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
read, and write SER files. 

They can be separated into four general groups: access, header, image, and
trailer.

{% highlight C %}
/*-------------------- SER Access Routines --------------------*/

int ser_create_file(serfile** sptr, const char* path, int* status);
int ser_open_file(serfile** sptr, const char* path, int mode, int* status);
int ser_close_file(serfile* sptr, int* status);

{% endhighlight %}

The access routines haven't change much functionally speaking with the only
new routine here being the `ser_create_file` routine.

{% highlight C %}
/*-------------------- Header Routines --------------------*/

int ser_read_rec_count(serfile* sptr, int* rec_count, int* status);
int ser_read_file_id(serfile* sptr, char* file_id, int* status);
int ser_read_lu_id(serfile* sptr, int32_t* lu_id, int* status);
int ser_read_color_id(serfile* sptr, int32_t* color_id, int* status);
int ser_read_little_endian(serfile* sptr, int32_t* little_endian, int* status);
int ser_read_image_width(serfile* sptr, int32_t* image_width, int* status);
int ser_read_image_height(serfile* sptr, int32_t* image_height, int* status);
int ser_read_pixel_depth_per_plane(serfile* sptr, int32_t* pixel_depth_per_plane, int* status);
int ser_read_frame_count(serfile* sptr, int32_t* frame_count, int* status);
int ser_read_observer(serfile* sptr, char* observer, int* status);
int ser_read_instrument(serfile* sptr, char* instrument, int* status);
int ser_read_telescope(serfile* sptr, char* telescope, int* status);
int ser_read_date_time(serfile* sptr, int64_t* date_time, int* status);
int ser_read_date_time_utc(serfile* sptr, int64_t* date_time_utc, int* status);

int ser_write_file_id(serfile* sptr, const char* file_id, int* status);
int ser_write_lu_id(serfile* sptr, const int32_t lu_id, int* status);
int ser_write_color_id(serfile* sptr, const int32_t color_id, int* status);
int ser_write_little_endian(serfile* sptr, const int32_t little_endian, int* status);
int ser_write_image_width(serfile* sptr, const uint32_t image_width, int* status);
int ser_write_image_height(serfile* sptr, const uint32_t image_height, int* status);
int ser_write_pixel_depth_per_plane(serfile* sptr, const int32_t pixel_depth_per_plane, int* status);
int ser_write_observer(serfile* sptr, const char* observer, int* status);
int ser_write_instrument(serfile* sptr, const char* instrument, int* status);
int ser_write_telescope(serfile* sptr, const char* telescope, int* status);
int ser_write_date_time(serfile* sptr, const int64_t date_time, int* status);
int ser_write_date_time_utc(serfile* sptr, const int64_t date_time_utc, int* status);

{% endhighlight %}

The set of header routines was the biggest change.

In the previous implementation, there were only two routines that provided 
read and write capabilities for the header. They required a `KEY` to select 
the header field and a `LEN` to know how many bytes to read from or write 
to. This was easy to mess up and offered little in the way of safety.

The new routines are now explicit on which header field they operate on and
are what data they require. Only the `char*` parameters need to be carefully
accounted for since the functions assume a specific length for these buffers.
These are still provided by the `LEN` constants and is explained in the
documentation.

{% highlight C %}
/*-------------------- Image Routines --------------------*/

int ser_get_number_of_planes(serfile* sptr, int* nop, int* status);
int ser_get_bytes_per_pixel(serfile* sptr, unsigned long* bytes_per_pixel, int* status); 
int ser_get_frame_byte_size(serfile* sptr, unsigned long* byte_size, int* status);
int ser_read_frame(serfile* sptr, void* dest, size_t idx, int* status);
int ser_append_frame(serfile* sptr, const void* data, uint64_t timestamp, int* status);

{% endhighlight %}

With the image routines, the addition of `ser_append_frame` to allow users 
to write new images to the SER file was the most important change. It
also functions as the write routine for the trailer since there needs
to a be a timestamp for every frame provided the trailer is active.


{% highlight C %}
/*-------------------- Trailer Routines --------------------*/

int ser_read_timestamp(serfile* sptr, int64_t* dest, size_t idx, int* status);
{% endhighlight %}

There's just one trailer routine which reads a timestamp.


### Validation

All routines now interact with SER files in a way that ensures validity
through a series of internal checks. This presents itself in many ways 
throughout the routines.

For example, you cannot change the width or height fields in the header
if image data is present as is may create an invalid correlation between
the two. 

While it's a bit restrictive in this manner, it helps to ensure malformed 
SER files can't be opened/created and valid ones can't be malformed.


### Using Check for Unit Tests

I replaced the entire testing framework with 
[Check](https://libcheck.github.io/check/). 
It's far better than what I produced and made developing the unit tests
much easier.


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


