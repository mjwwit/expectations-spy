/**
 * Created by michael on 29/04/15.
 */
'use strict';

require('expectations');

var SpyRegistry = require('./lib/spy-registry');
var util = require('./lib/utils');

var registry = new SpyRegistry();

module.exports = {
    spyOn: registry.spyOn
};

expect.addAssertion('toHaveBeenCalled', function () {
    if (!util.isSpy(this.value)) {
        throw new Error('Expected a spy, but got ' + this.value.toString() + '.');
    }

    if (arguments.length > 1) {
        throw new Error('toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith');
    }

    var message;
    if (this.value.calls.any()) {
        message = this.generateMessage(this.value.and.identity(), this.expr, 'not to have been called', undefined);
        this.assertions.pass(message);
    } else {
        message = this.generateMessage(this.value.and.identity(), this.expr, 'to have been called', undefined);
        this.assertions.fail(message);
    }
});

expect.addAssertion('toHaveBeenCalledOnce', function () {
    if (!util.isSpy(this.value)) {
        throw new Error('Expected a spy, but got ' + this.value.toString() + '.');
    }

    if (arguments.length > 1) {
        throw new Error('toHaveBeenCalledOnce does not take arguments, use toHaveBeenCalledWith');
    }

    var message;
    if (this.value.calls.count() === 1) {
        message = this.generateMessage(this.value.and.identity(), this.expr, 'not to have been called once', undefined);
        this.assertions.pass(message);
    } else {
        message = this.generateMessage(this.value.and.identity(), this.expr, 'to have been called once', undefined);
        this.assertions.fail(message);
    }
});

expect.addAssertion('toHaveBeenCalledWith', function () {
    var args = Array.prototype.slice.call(arguments, 0),
        message;

    if (!util.isSpy(this.value)) {
        throw new Error('Expected a spy, but got ' + this.value.toString() + '.');
    }

    if (!this.value.calls.any()) {
        message = this.generateMessage(this.value.and.identity(), this.expr, 'to have been called with', args);
        this.assertions.fail(message);
    }

    if (util.contains(this.value.calls.allArgs(), args)) {
        message = this.generateMessage(this.value.and.identity(), this.expr, 'not to have been called with', args);
        this.assertions.pass(message);
    } else {
        message = this.generateMessage(this.value.and.identity(), this.expr, 'to have been called with', args);
        this.assertions.fail(message);
    }
});