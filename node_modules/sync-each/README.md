# sync-each

No-bullshit, ultra-simple, 35-lines-of-code synchronized forEach function for JavaScript.

For browsers and node.js.

## Installation
* Just include sync-each before your scripts.
* `npm install sync-each` if you’re using node.js.
* `bower install sync-each` if you’re using [Bower](http://bower.io).

## Usage

* `each(array, iterator, callback);` — `Array`, `Function`, `(optional) Function`
* `iterator(item, next)` receives current item and a callback that will mark the item as done. `next` callback receives optional `error, transformedItem` arguments.
* `callback(error, transformedArray)` optionally receives first error and transformed result `Array`.

```javascript
var each = require('sync-each');
each(items, 
	function (items,next) {
			//perform async operation with item
			next(err,transformed)
	},
	function (err,transformedItems) {
			//Success callback
	}
)


// Alternatively in browser:
syncEach(list, fn, callback);
```

