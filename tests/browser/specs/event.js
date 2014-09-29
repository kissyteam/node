/**
 * event attached for node
 * @author gonghao, yiminghe@gmail.com
 */

var $ = require('node');
/*jshint quotmark:false*/
// simulate mouse event on any element
var simulate = function (target, type, relatedTarget) {
    if (typeof target === 'string') {
        target = $(target)[0];
    }
    window.simulateEvent(target, type, { relatedTarget: relatedTarget });
};

describe("node-event", function () {
    it('should set this properly', function (done) {
        var ret;

        // Node
        $('#link-test-this').on('click', function () {
            ret = this;
        });
        simulate('#link-test-this', 'click');
        async.series([
            waits(0),

            runs(function () {
                expect(ret.nodeType).not.to.be(undefined);
            }),

            // NodeList
            runs(function () {
                $('#link-test-this-all span').on('click', function () {
                    ret = $(this);
                });
                simulate('#link-test-this-all-span', 'click');
            }),

            waits(0),

            runs(function () {
                expect(ret.text()).to.be('link for test this');
            }),

            // Dom Element
            runs(function () {
                $('#link-test-this-dom').on('click', function () {
                    ret = $(this);
                });
                simulate('#link-test-this-dom', 'click');
            }),

            waits(0),

            runs(function () {
                expect(ret.prop('nodeType')).to.be(1);
            })], done);
    });

    it('should detach properly', function (done) {
        var ret;

        // Node
        var node = $('#link-detach');

        function t() {
            ret = 1;
        }

        node.on('click', t);

        node.detach('click', t);

        simulate('#link-detach', 'click');

        setTimeout(function () {
            expect(ret).to.be(undefined);
            done();
        }, 10);
    });

    it('can get fire return value', function () {
        var n = $("<div/>");

        n.on('xx', function () {
            return 1;
        });

        n.on('xx', function () {
        });

        expect(n.fire('xx')).to.be(1);

        n.detach();

        n.on('xx', function () {
            return false;
        });

        n.on('xx', function () {
            return 1;
        });

        n.on('xx', function () {
        });

        expect(n.fire('xx')).to.be(false);

        n.detach();

        n.on('xx', function () {
            return 1;
        });

        n.on('xx', function () {
            return null;
        });

        expect(n.fire('xx')).to.be(null);
    });

    it('can get fireHandler return value', function () {
        var n = $("<div/>");

        n.on('xx', function () {
            return 1;
        });

        n.on('xx', function () {
        });

        expect(n.fireHandler('xx')).to.be(1);

        n.detach();

        n.on('xx', function () {
            return false;
        });

        n.on('xx', function () {
            return 1;
        });

        n.on('xx', function () {
        });

        expect(n.fireHandler('xx')).to.be(false);

        n.detach();

        n.on('xx', function () {
            return 1;
        });

        n.on('xx', function () {
            return null;
        });

        expect(n.fireHandler('xx')).to.be(null);
    });
});