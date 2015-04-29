# expectations-spy
A spy helper for the [expectations](https://github.com/spmason/expectations) (jasmine-style) test framework.
Using the same API and logic as [Jasmine 2.3.0](https://github.com/jasmine/jasmine).

## Usage

```javascript
require('expectations');
var spyOn = require('expectations-spy').spyOn;

describe("A spy", function() {
    var foo, bar = null;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            }
        };

        spyOn(foo, 'setBar');

        foo.setBar(123);
        foo.setBar(456, 'another param');
    });

    it("tracks that the spy was called", function() {
        expect(foo.setBar).toHaveBeenCalled();
    });

    it("tracks all the arguments of its calls", function() {
        expect(foo.setBar).toHaveBeenCalledWith(123);
        expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
    });

    it("stops all execution on a function", function() {
        expect(bar).toBeNull();
    });
});
```
