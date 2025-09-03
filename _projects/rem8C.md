---
section: projects
layout: project
style-sheets: [default, project-page]
title: rem8C
priority: 3
github: https://github.com/RyanVNgo/rem8C
images:
    - https://raw.githubusercontent.com/RyanVNgo/rem8C/refs/heads/main/images/IBM_test.png
    - https://raw.githubusercontent.com/RyanVNgo/rem8C/refs/heads/main/images/Flags_test.png
    - https://raw.githubusercontent.com/RyanVNgo/rem8C/refs/heads/main/images/Corax_test.png
blip: >
    A CHIP-8 emulator made in C.
---

![IBM logo test ROM running]({{ page.images[0] }})

This emulator was developed for the sake of learning and understanding the
core functionality of computer systems at a rudimentary level. I primarily
referenced [this page by mattmikolay](https://github.com/mattmikolay/chip-8/wiki/Mastering-CHIP%E2%80%908)
when developing the emulator and utilized [Timendus's CHIP-8 test suite](https://github.com/Timendus/chip8-test-suite/tree/main)
to evalute the functionality and accuracy of the emulator.

## Problems During Development

Something important to note about CHIP-8 is that it's more of an
interpreted programming language than an actual emulator of some
real piece of hardware. As a result, certain parts of CHIP-8 aren't
well defined.


### Call Stack

The call stack, which is usually some block of memory
reserved for storing information regarding subroutines, doesn't
really exist within memory. CHIP-8 just handles the call stack
as a seperate entity independent of the addressable memory space.

This is not how most CPUs operate since they usually need to put
this call stack somewhere within RAM and access the stack through
a stack pointer.

With that being said, I decided to implement the call stack as
existing within the addressable memory space and adding an
additional register for a stack pointer to keep track of this
call stack.

It appears to work for now since most CHIP-8 programs I've found
don't attempt to address/manipulate memory below `0x0200` which
is where I put the call stack (starting at `0x01FF` and moving
downward).


### Instruction Set

The exact behavior of each instruction was usually outlined
pretty well but some instructions needed a bit more digging.

As mentioned earlier, I used [Timendus's CHIP-8 test suite](https://github.com/Timendus/chip8-test-suite/tree/main)
to test the accuracy of each instruction's behavior and found
that some instructions weren't passing. Specifically `8XY1`,
`8XY2`, `8XY3`.

I found that the documentation I was using to build the emulator
either missed out on the fact or is of a different implementation
to the fact that these instructions needed to reset the `0x0F`
register. I had to do a good amount of digging online to discover
this.

Again, this implementation appears to work as it passes all the tests.
For now, these changes in implementation will remain.

![Corax test ROM running]({{ page.images[2] }})

![Flags test ROM running]({{ page.images[1] }})


### ROM Compatibility

I referenced [this](https://johnearnest.github.io/chip8Archive/?sort=platform#chip8)
archive for CHIP-8 ROMs and found that most of them worked with my
emulator.

However, I experienced some bugs with certain ROMs that I'm sure have
something to do with my current implementation of the CHIP-8 instruction
set.

At this point, my emulator passed all of the tests from the test suite
and appears to work fine with most ROMs so I'll leave these possible
implementation issues for the future.

## Future Development

Aside from investigating the issues mentioned earlier, there were several
extensions of CHIP-8 that existed and the test suite I used even provides
tests for these exteneded CHIP-8 versions. These being the SUPER-CHIP and
XO-CHIP implementations.

I may develop and integrate these exteneded version of CHIP-8 into my
emulator but I'll leave these for the time being.

Beyond CHIP-8, I may start developing emulators for systems running
on 6502 based chips but we'll have to see.

