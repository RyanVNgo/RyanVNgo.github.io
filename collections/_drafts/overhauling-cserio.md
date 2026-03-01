---
section: posts
layout: post
style-sheets: [default, post-page]
title: Rewriting My Old C Library - CSERIO
---

I started developing CSERIO in 2024 after wanting a C library that could
provide IO routines for `.ser` format files in a similar manner CFITSIO with 
`.fits` format files. However, after writing some routines that provided 
basic operations, I lost interest in the developing the library further 
for reasons I don't remember.

Some time has passed since then and after looking back it, I wish I had 
properly completed it, especially since there are some applications I'm
considering to make that will likely need the capacity to manipulate SER 
files.

So that's what I've done. For the past two months I rewrote the entirety
of the CSERIO library, changing a significant amount of the internal
implementation and developing a complete range of routines.

In this post I'll go over the problems of the previous implementation, 
the changes I made for the new one, and some hurdles I ran into during 
development.


## The Problems

{% highlight C %}
/* Previous Implementations */

/*-------------------- Core Routines --------------------*/

void cserio_version_number(int* major, int* minor, int* micro);

/*-------------------- File Access Routines --------------------*/

void ser_open_file(serfile** sptr, char* filename, int mode, int* status);
void ser_close_file(serfile* sptr, int* status);

/*-------------------- Header Routines --------------------*/

void ser_get_hdr_count(serfile* sptr, int* rec_count, int* status);
void ser_get_idx_record(serfile* sptr, void* dest, int idx, int* status);
void ser_get_key_record(serfile* sptr, void* dest, int key, int* status);

void ser_write_idx_record(serfile* sptr, void* data, int idx, size_t size, int* status);
void ser_write_key_record(serfile* sptr, void* data, int key, size_t size, int* status);

/*-------------------- Image Routines --------------------*/

void ser_get_frame_count(serfile* sptr, int* frame_count, int* status);
void ser_get_frame_dim_size(serfile* sptr, int* size, int dim, int* status);

void ser_get_bytes_per_pixel(serfile* sptr, unsigned long* bytes_per_pixel, int* status); 
void ser_get_frame_byte_size(serfile* sptr, unsigned long* byte_size, int* status);

void ser_read_frame(serfile* sptr, void* dest, int idx, int* status);
{% endhighlight %}

### Incomplete Implementation

As stated earlier, I never developed a full range of routines that could
cover the situations one might want when working with SER files. The library 
could only: open/close files, read/write header data, and read image data. 
So creating new SER files, writing image data, and anything involving the 
trailer just didn't exist.

### Data Retrieval

Every time one of the methods read or wrote data, the operation would happen
with immediate involvement of the file. This wasn't necessarily *bad* but 
depending on how one used the library, it could result in an excessive amount 
of reads and writes to the disk.

### File Validity

The library didn't enforce any structure or correctness to the data that was
read or written to the SER file. For example, the `ser_open_file` routine 
didn't perform any checks to validate whether the header fields correctly
described the image data. On top of that, the write routines could change
header fields in a way that could incorrectly represent the image data.

### Unit Tests

I'm not entirely sure why I did this but I chose to write my own utilities
for the unit tests. So instead of using some other, well produced unit
testing library like gtest or check, I made my own. All this really resulted
in was more work on my end to validate library functionality. 


## Redesign and Improvements

### Consolidation to a Single Header

In the previous implementation, I placed all the defines, structs, and 
function prototypes into a single header file and placed all funciton
definitions in a series of source files. Then, I provided a `Makefile`
which would build the files into a static library file `libcserio.a`.

{% highlight C %}
#if defined(CSERIO_IMPLEMENTATION)
{% endhighlight %}

{% highlight C %}
#define CSERIO_IMPLEMENTATION
#include "cserio.h"

int main(void) {
    ...
}

{% endhighlight %}



### Complete Suite of Routines

The new set of routines now provides enough functionality needed to create,
read, and write SER files. 


### Support for File and Memory Backends

Initially rooted out of a desire for simpler testing conditions, I developed 
`serfile`, the primary data structure in CSERIO, in a way that supported both 
file and memory based interactions. To support this, I obscured the data type
and interfaces that interact with it. These components are defined as the 
`io_context`, `reader`, and `writer`.

{% highlight C %}
typedef struct serfile {
    void*       io_context;
    size_t      (*reader)(void* io_context, void* buffer, size_t size, size_t offset);
    size_t      (*writer)(void* io_context, const void* data, size_t size, size_t offset);
    ...
} serfile;
{% endhighlight %}

It also required the development of a memory structure that provided context
to its size, bounds, and ownership. This was simply called `serMem`.

{% highlight C %}
typedef struct {
    uint8_t* data;
    size_t size;
    size_t view_size;
    bool owns_buffer;
} serMem;
{% endhighlight %}

By implementing this abstraction, I can control what `io_context` points to and
which function `reader` and `writer` point to.

{% highlight C %}
static void ser_memory_read(...) {...}
static void ser_memory_write(...) {...}
static void ser_file_read(...) {...}
static void ser_file_write(...) {...}

// void ser_create_memory(...) {
// void ser_open_view(...) {
void ser_open_memory(serfile** sptr, ...) {
    ...
    serMem* ser_data = (serMem*)malloc(sizeof(serMem))
    ...
    *sptr->io_context = ser_data;
    *sptr->reader = ser_memory_read;
    *sptr->writer = ser_memory_write;
    ...
}

// void ser_create_memory(...) {
// void ser_open_memory(...) {
void ser_open_view(serfile** sptr, char* path, ...) {
    ...
    FILE* file = fopen(path, ...);
    ...
    *sptr->io_context = file;
    *sptr->reader = ser_file_read;
    *sptr->writer = ser_file_write;
    ...
}
{% endhighlight %}

The result is the user can choose which data context they want to operate
within. And so long as they open and close these contexts with the 
appropriate routines, then all other routines in the library operate 
identically.

### Source Validation



### Write Validation



### Using **check** for Unit Tests



## What I Learned 

### Put More Effort Into Planning


### Deploy Incrementally



## Now
- functional state
- strict functionality

