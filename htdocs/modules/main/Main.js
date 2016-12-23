
define('/Main', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var NotFound = module.require('NotFound');
    var Loading = module.require('Loading');
    var Header = module.require('Header');
    var Content = module.require('Content');
    var Mark = module.require('Mark');
    var Url = module.require('Url');

    var panel = KISP.create('Panel', '#div-panel-main');
    var current = null;

    panel.on('init', function () {

        Header.on({
            'numbers': function (checked) {
                panel.$.toggleClass('no-numbers', !checked);
            },
            'comment': function (checked) {
                panel.$.toggleClass('no-comment', !checked);
            },
            'empty': function (checked) {
                Content.empty(checked);
            },
            'mark': function (checked) {
                Mark.render(checked);
            },
        });

        Content.on({
            //这个事件会给delay 100ms 触发。
            'loading': function () {
                Loading.show();
            },

            'render': function () {
                Loading.hide();
                panel.fire('render', [current]);
            },

            'line': function (y) {
                Mark.render(y);
            },

            'hash': function (hash) {
                panel.fire('hash', [hash]);
            },
        });

        panel.$.on('click', function () {
            panel.fire('click');
        });

    });


    panel.on('render', function (url) {

        var data = current = Url.parse(url);
        panel.$.toggleClass('source', data.isCode);

        Header.render(data);
        Content.render(url);
        Mark.render(data);
        NotFound.hide();

      
    });



    return panel.wrap({

        //显示大纲
        'outline': Content.outline,

        'loading': function () {
            panel.$.removeClass('source');
            Content.hide();
            NotFound.hide();
            Loading.show();
        },

        'notfound': function (file) {
            panel.$.removeClass('source');
            Header.hide();
            Content.hide();
            Loading.hide();
            Mark.hide();

            //避免跟 Content.loading 事件竞争。
            setTimeout(function () {
                Loading.hide();
                NotFound.render(file);
            }, 100);
        },

    });

});
