/**
 * Created by michael on 29/04/15.
 */
'use strict';

var CallTracker = require('./call-tracker');
var SpyStrategy = require('./spy-strategy');

module.exports = {
    isSpy: function (fn) {
        if (!fn || !(fn instanceof Function)) {
            return false;
        }

        return fn.and instanceof SpyStrategy && fn.calls instanceof CallTracker;
    },

    createSpy: function (name, originalFn) {
        var spyStrategy = new SpyStrategy({
                name: name,
                fn: originalFn,
                getSpy: function () {
                    return spy;
                }
            }),
            callTracker = new CallTracker(),
            spy = function () {
                var callData = {
                    object: this,
                    args: Array.prototype.slice.apply(arguments)
                };

                callTracker.track(callData);
                var returnValue = spyStrategy.exec.apply(this, arguments);
                callData.returnValue = returnValue;

                return returnValue;
            };

        for (var prop in originalFn) {
            if (prop === 'and' || prop === 'calls') {
                throw new Error('Jasmine spies would overwrite the \'and\' and \'calls\' properties on the object being spied upon');
            }

            spy[prop] = originalFn[prop];
        }

        spy.and = spyStrategy;
        spy.calls = callTracker;

        return spy;
    },

    contains: function (array, search) {
        var i = array.length;
        if (!(search instanceof Array) && !(search instanceof Function)) {
            while (i--) {
                if (array[i] === search) {
                    return true;
                }
            }
        } else if (search instanceof Array) {
            while (i--) {
                if (search.length === array[i].length) {
                    var j = search.length;
                    var equals = true;
                    while (j--) {
                        if (search[j] !== array[i][j]) {
                            equals = false;
                        }
                    }
                    return equals;
                }
            }
        } else if (search instanceof Function) {
            while (i--) {
                if (array[i].toString() === search.toString()) {
                    return true;
                }
            }
        }

        return false;
    }
};