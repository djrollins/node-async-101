node-101: For experienced developers

Assumptions

* You can understand JavaScript syntax
* You have some idea what node is

Specific JavaSCript syntax:

variable asignmnet
objects & arrays - propery access and index
functions: traditional and arrow functions

What is node

Not just JavaScript.

JavaScript VM, event loop, standard library and platform APIs, packaging tools and package ecosystem

Poll. What makes node different from other languages? Event loop

JavaScript is syncronous, yes, but the event loop allows us to do certain things in the background.
Platform APIs and Network stuff is done asyncronously so that we can do other things whilst we wait on sockets

In a lot of languages async would be outside the scope of a 101 session, but node _is_ async so it's foundational.

Traditionally done via callbacks, then explicit promises, then async-await;

start a new package

do npm init

time node . /usr/share/dict/{british-english,american-english,words} package.json index.js

get arguments and loop through them:
    - traditional for loop
    - for-in ... not what you'd expect loops over keys, because arrays are actually objects in JavaScript but with numeric keys
    - for-of - this is what you were expecting

require request-sync

perfomr get request

get byte count

convert to text buffer.toString('utf-8');

get characters, words and lines

construct stats object (use explicit keys first)
Can just use the variable names if they are the same as the keys
