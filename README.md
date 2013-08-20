#  Dashboard
*A superfloating, fluid and ratio-keeping grid for dashboards with the simple concept of always looking awesome.*
[Demo](http://niklasek.se/sqr)

## CSS Base
The core layout is pure CSS, which works really well for grids with only squares. If that is what you want, don't bother with the JS. See concept at [fluidsquares.com](http://www.fluidsquares.com/).

## JS Enhancement
Though squares are nice and all, in my case some components needed to be rectangles. With pure CSS the shapes don't float upwards naturally, which leave wierd holes in the layout. This is why I've constructed a small script which handles all this for you and makes smaller components float upwards past the larger ones to fit nicely. It makes them superfloating!

## Included
*What is inside of the scripts*

### Widgets
A container which describes its
* size in number of columns
* id
* color
* position/order

### Grid
A container for widgets. Got methods for plotting them to the DOM.

### Organizer
Make the magic happen and calculates the best element order for organizing boxes and make it look clean.

## Known Issues
* When only rectangles are used there are no elements to fill the gaps. Should instead resize to fill out the empty space.
* No tests
* No buildtool
* No license, free to use however you want, recognition would be nice though.
* etc.

## Lastly
Hope it is usable and/or inspiring. Any enhancements are welcome. Enjoy!


