/**
 * test cases for node about chained call and return value
 * @author yiminghe@gmail.com
 */

/*jshint quotmark:false*/
/*global jQuery*/
var Dom = require('dom');
var util = require('util');
var jq = jQuery;
var $ = require('node');
//Dom 已经测试通过，通过 Dom 测 Node
describe("node", function () {

    it('support filter', function () {
        var nodes = $('<div class="x" id="x"></div>' +
            '<div class="y" id="y"></div>' +
            '<div class="z" id="z"></div>');

        var ret = nodes.filter(function (n, i) {
            return $(n).hasClass('z') && i === 2;
        });

        expect(ret.length).to.be(1);
        expect(ret.attr('id')).to.be('z');

        ret = nodes.filter('.x');
        expect(ret.attr('id')).to.be('x');

        expect(ret.length).to.be(1);
    });

    it('node is not plainObject', function () {
        expect(util.isPlainObject($('body'))).to.be(false);
        expect(util.isPlainObject($('#ee'))).to.be(false);
        expect(util.isPlainObject($(document.body))).to.be(false);
    });

    it("add works", function () {
        var x = $();
        var y = x.add("<div></div><p></p>");

        expect(x).not.to.be(y);
        expect(y.length).to.be(2);
        var z = y.add("<s></s>");
        expect(z.length).to.be(3);
        expect(z.item(2).getDOMNode().nodeName.toLowerCase()).to.be("s");
        var q = z.add("<b></b>", 0);
        expect(q.length).to.be(4);
        expect(q.item(0).getDOMNode().nodeName.toLowerCase()).to.be("b");
    });

    it("should invoke dom method correctly on node", function () {
        var n = $("<div id='testDiv' class='test-div'>ok</div>").appendTo(document.body);
        expect($("#testDiv")[0]).not.to.be(undefined);
        expect($("#testDiv2")[0]).to.be(undefined);

        $("<div id='testDiv3' class='test-div'>ok3</div>").appendTo(n);
        expect($("#testDiv3")[0]).not.to.be(null);
        expect($("#testDiv3").parent().equals(n)).to.be(true);

        $("<div id='testDiv6' class='test-div'>ok5</div>").appendTo(document.body);

        //data chained
        expect(n.data('x')).to.be(undefined);
        expect(jq(n).data('x')).to.be(undefined);
        n.data('x', null);
        jq(n).data('x', null);
        expect(jq(n).data('x')).to.be(null);
        expect(n.data('x')).to.be(null);
        expect(n.data('x', 'y')).to.be(n);
        expect(n.data('x')).to.be('y');

        //attr chained
        expect(n.attr("test")).to.be(undefined);
        expect(n.attr("test", "xx")).to.be(n);
        expect(n.attr("test")).to.be("xx");
        expect(n.hasAttr("test")).to.be(true);
    });

    it("should invoke dom method correctly on nodelist", function () {
        var nl = $(".test-div");

        //chain
        expect(nl.css({
            'height': "200px",
            'overflow': 'hidden'
        })).to.be(nl);

        nl.each(function (n) {
            expect(n.css('height')).to.be("200px");
        });
    });

    it('append can allow number', function () {
        var div = $('<div></div>');
        div.appendTo(document.body);
        div.append(1);
        expect(div.html()).to.be('1');
        div.remove();
    });

    it("should invoke method on window or document correctly", function () {
        var win = $(window), doc = $(document);

        expect(win.height()).to.be(Dom.viewportHeight());
        expect(win.width()).to.be(Dom.viewportWidth());

        expect(doc.height()).to.be(Dom.docHeight());
        expect(doc.width()).to.be(Dom.docWidth());
    });

    it("should append/prepend correctly on node", function () {
        var body = $(document.body);

        var n = body.append("<div class='test-div' id='testDiv4'>ok4</div>");

        expect(n).to.be(body);

        expect(Dom.get("#testDiv4")).not.to.be(null);

        $("#foo").prepend("<div class='test-div' id='testDiv5'>ok5</div>");

        expect(Dom.get("#testDiv5")).not.to.be(null);
    });

    it("should append/prepend correctly on nodelist", function () {
        var body = $(document.body);
        $("<div id='testDiv7' class='test-div'>ok7</div>" +
            "<div id='testDiv8' class='test-div'>ok8</div>").appendTo(body);
        expect(Dom.get("#testDiv7")).not.to.be(null);
        expect(Dom.get("#testDiv8")).not.to.be(null);

        var newNode = $("<div class='test-nodelist'>test-nodelist</div>" +
            "<div class='test-nodelist'>test-nodelist2</div>");
        var testDivs = $(".test-div");

        testDivs = testDivs.append(newNode);
        expect(testDivs.length * 2).to.be(Dom.query(".test-nodelist").length);


        testDivs.append("<div class='test-nodelist2'>test-nodelist3</div>" +
            "<div class='test-nodelist2'>test-nodelist4</div>");
        expect(testDivs.length * 2).to.be(Dom.query(".test-nodelist2").length);


        $("#testDiv7").append($("#testDiv8"));
        expect($("#testDiv8").parent().equals($('#testDiv7'))).to.be(true);


        testDivs.prepend("<div class='test-nodelist3-pre'>test-nodelist5-pre</div>" +
            "<div class='test-nodelist3-last'>test-nodelist6-last</div>");

        expect(testDivs.length).to.be(Dom.query(".test-nodelist3-pre").length);
        expect(testDivs.length).to.be(Dom.query(".test-nodelist3-last").length);


        var pres = $(".test-nodelist3-pre"),
            lasts = $(".test-nodelist3-last");
        expect(pres.length).to.be(lasts.length);

        for (var i = 0; i < pres.length; i++) {
            expect(pres.item(i).parent().attr("class")).to.be("test-div");
            expect(pres.item(i).prev()).to.be(null);
            expect(lasts.item(i).prev().equals(pres.item(i))).to.be(true);
        }
    });

    it("should insertBefore/insertAfter correctly", function () {
        var testDivs = $(".test-div");

        (function () {
            $("<div class='test-insertafter'>insertafter1</div>" +
                "<div class='test-insertafter2'>insertafter2</div>")
                .insertAfter(testDivs);

            var pres = $(".test-insertafter"),
                lasts = $(".test-insertafter2");
            expect(pres.length).to.be(lasts.length);

            for (var i = 0; i < pres.length; i++) {
                expect(pres.item(i).next().equals(lasts.item(i))).to.be(true);
                expect(pres.item(i).prev().attr("class")).to.be("test-div");
            }
        })();

        (function () {
            $("<div class='test-insertbefore'>insertbefore1</div>" +
                "<div class='test-insertbefore2'>insertbefore2</div>")
                .insertBefore(testDivs);

            var pres = $(".test-insertbefore"),
                lasts = $(".test-insertbefore2");
            expect(pres.length).to.be(lasts.length);

            for (var i = 0; i < pres.length; i++) {
                expect(pres.item(i).next().equals(lasts.item(i))).to.be(true);
                expect(lasts.item(i).next().attr("class")).to.be("test-div");
            }
        })();
    });

    it("wrapAll works", function () {
        var time = (+new Date());
        var wrappedCls = "f" + time;
        var wrapperCls = 'x' + time;
        var body = document.body;
        var foo = body.appendChild(Dom.create("<div class='" + wrappedCls + "'></div>"));
        var foo2 = body.appendChild(Dom.create("<div class='" + wrappedCls + "'></div>"));
        $("." + wrappedCls).wrapAll("<div class='" + wrapperCls + "'>" +
            "<div class='x" + wrapperCls + "'></div>" +
            "</div>");
        expect(foo.nextSibling).to.be(foo2);
        expect(foo.parentNode.childNodes.length).to.be(2);
        expect(foo.parentNode.className).to.be('x' + wrapperCls);
        expect(foo.parentNode.parentNode.className).to.be(wrapperCls);
        Dom.remove([foo, foo2]);
        $("." + wrapperCls).remove();
    });

    it("one/all should select nodes ", function () {
        var body = $(document.body);


        var doms = Dom.query(".test-div");

        var testDivs = $(".test-div");
        expect(testDivs instanceof $).to.be(true);
        expect(doms.length).to.be(testDivs.length);


        var i;
        for (i = 0; i < doms.length; i++) {
            expect(doms[i]).to.be(testDivs[i]);
        }

        var ps = body.all(".test-div");
        expect(ps instanceof $).to.be(true);
        expect(doms.length).to.be(ps.length);
        for (i = 0; i < doms.length; i++) {
            expect(doms[i]).to.be(ps[i]);
        }
    });

    it("children should return nodelist", function () {
        var body = $(document.body);
        var dbivs = Dom.children(body[0], 'div');
        var bdivnodes = body.children('div');
        expect(bdivnodes instanceof $).to.be(true);
        expect(dbivs.length).to.be(bdivnodes.length);
    });

    it("one/all should create nodes", function () {
        $("<div id='one-all-create'>one-all-create</div><div id='one-all-create2'>one-all-create2</div>")
            .appendTo($(document.body));

        expect($("#one-all-create")[0]).not.to.be(null);
        expect($("#one-all-create2")[0]).not.to.be(null);
        expect($("#one-all-create3")[0]).to.be(undefined);
    });

    it("context support Node or htmlelement", function () {
        $("<div id='context-wrapper'>" +
            "<div class='test-div'>context-wrapper : test-div</div>" +
            "</div>").appendTo(document.body);

        expect($(".test-div", $("#context-wrapper")).length).to.be(1);

        expect($(".test-div", Dom.get("#context-wrapper")).length).to.be(1);
    });

    it("should on/detach event properly", function () {
        var cb = $("#cb");
        var handler = function () {
            expect(this).to.be(cb.getDOMNode());
        };
        cb.on('click', handler);

        window.simulateEvent(cb.getDOMNode(), 'click');

        waits(10);

        runs(function () {
            cb.detach('click', handler);
        });

        var h2 = function () {
            expect(this.className).to.be("test-div");
        };

        var body = $(document.body);

        var ps = body.all(".test-div");

        runs(function () {
            ps.on('click', h2);
            ps.each(function (n) {
                window.simulateEvent(n.getDOMNode(), 'click');
            });
        });

        waits(10);

        runs(function () {
            ps.detach('click', h2);
        });

    });

    it("should return value or chains correctly", function () {
        var n = $("<div>test return</div>").appendTo(document.body);

        var ret = n.attr("test", "5");

        // chained
        expect(ret).to.be(n);

        // not chained , get value
        expect(n.attr("test")).to.be('5');

        // no-exist attribute return null
        expect(n.attr("test2")).to.be(undefined);


        var ret2 = n.css("font-size", "13px");

        expect(ret2).to.be(n);

        expect(n.css("font-size")).to.be("13px");

        // no-exit css value return ''
        expect(n.css("xx")).to.be('');

    });

    it("should end correctly", function () {
        var html = $("<div id='end1'><div class='end2'></div><div class='end3'></div></div>").appendTo('body');
        html.all(".end2").text("end2").end().all(".end3").text("end3").end().append("<div class='end4'></div>");
        expect($("#end1 .end2").text()).to.be("end2");
        expect($("#end1 .end3").text()).to.be("end3");
        expect($("#end1 .end4").length).to.be(1);
    });
});

describe("selector context", function () {
    var html = $(
            "<div id='context-test-1' class='context-test'>" +
            "<div class='context-test-3' id='context-test-2'></div>" +
            "</div>" +
            "<div class='context-test-3' id='context-test-4'></div>" +
            "<div class='context-test'>" +
            "<div class='context-test'>" +
            "<div class='context-test-3' id='context-test-5'>" +
            "</div>" +
            "</div>" +
            "</div>").appendTo('body');

    it("should support #id", function () {
        expect($(".context-test-3", "#context-test-1").length).to.be(1);
        expect($(".context-test-3").length).to.be(3);
        expect($(".context-test-3", "#context-test-1").attr('id')).to.be("context-test-2");
    });

    it("should support other string form selector and unique works", function () {
        expect($(".context-test-3", ".context-test").length).to.be(2);
    });


    it("should support node array form selector and unique works", function () {
        var c3 = $(".context-test-3");
        expect(c3.length).to.be(3);
        var c = $(".context-test");
        expect(c.length).to.be(3);
        expect($(c3, ".context-test").length).to.be(2);
        expect($(".context-test-3", c).length).to.be(2);
        expect($(c3, c).length).to.be(2);
        expect($(".context-test-3", ".context-test").length).to.be(2);

        expect(c.all(".context-test-3").length).to.be(2);
        expect(c.all(c3).length).to.be(2);

    });

    // #85
    it("slice works", function () {
        expect($('body').slice(0 - 1)[0]).to.be(document.body);
        expect($(".context-test-3").slice(0 - 2).length).to.be(2);
        expect($(".context-test-3").slice(0 - 2, -1).length).to.be(1);
    });

    it('index works', function () {

        var div = $('<ul class="index-ul">' +
            '<li class="index-li">0</li>' +
            '<li class="index-li">1</li>' +
            '<li class="index-li">2</li>' +
            '</ul>').appendTo('body');

        // 单个节点
        expect($('.index-li').index($('.index-li')[1])).to.be(1);

        // 取第一个节点
        expect($('.index-li').index($('.index-li'))).to.be(0);

        // 第一个节点在 parent 中找
        expect($('.index-li').index()).to.be(0);

        expect($('.index-li').item(1).index()).to.be(1);

        // selector 集合中找当前第一个节点
        expect($('.index-li').item(1).index('.index-li')).to.be(1);

        expect($('body').index('.index-li')).to.be(-1);

        div.remove();

    });

    runs(function () {
        html.remove();
    });
});