'use strict';

var util = require('./utils');

function SpyRegistry(options) {
    options = options || {};
    var currentSpies = options.currentSpies || function() { return []; };

    this.spyOn = function(obj, methodName) {
        if (obj === undefined) {
            throw new Error('spyOn could not find an object to spy upon for ' + methodName + '()');
        }
        if (methodName === undefined) {
            throw new Error('No method name supplied');
        }
        if (obj[methodName] === undefined) {
            throw new Error(methodName + '() method does not exist');
        }

        if (obj[methodName] && util.isSpy(obj[methodName])) {
            //TODO?: should this return the current spy? Downside: may cause user confusion about spy state
            throw new Error(methodName + ' has already been spied upon');
        }

        var spy = util.createSpy(methodName, obj[methodName]);

        currentSpies().push({
            spy: spy,
            baseObj: obj,
            methodName: methodName,
            originalValue: obj[methodName]
        });

        obj[methodName] = spy;

        return spy;
    };

    this.clearSpies = function() {
        var spies = currentSpies();
        for (var i = 0; i < spies.length; i++) {
            var spyEntry = spies[i];
            spyEntry.baseObj[spyEntry.methodName] = spyEntry.originalValue;
        }
    };
}

module.exports = SpyRegistry;