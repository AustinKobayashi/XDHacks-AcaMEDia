//sync-each MIT license (by Daniel Kouba   http://www.danielkouba.cz).
(function(globals) {
    'use strict';
    var each = function(items, next, callback) {
        if (!Array.isArray(items)) throw new TypeError('each() expects array as first argument');
        if (typeof next !== 'function') throw new TypeError('each() expects function as second argument');
        if (typeof callback !== 'function') callback = Function.prototype; // no-op

        if (items.length === 0) return callback(undefined, items);

        var transformed = new Array(items.length);
        var count = 0;
        var returned = false;

        var iterate = function (index) {
            var item = items[index];
            next(item, function(error, transformedItem) {
                if (returned) return;
                if (error) {
                    returned = true;
                    return callback(error);
                }
                transformed[index] = transformedItem;
                count += 1;
                if (count === items.length) return callback(undefined, transformed);
                if (index < items.length) {
                    iterate(index + 1);
                }
            });

        };
        iterate(0)




    };

    if (typeof define !== 'undefined' && define.amd) {
        define([], function() {
            return each;
        }); // RequireJS
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = each; // CommonJS
    } else {
        globals.syncEach = each; // <script>
    }
})(this);