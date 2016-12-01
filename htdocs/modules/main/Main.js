
define('/Main', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

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
            'render': function () {
                panel.fire('render', [current]);
            },

            'line': function (y) {
                Mark.render(y);
            },
        });

    });


    panel.on('render', function (url) {

        var data = current = Url.parse(url);
        panel.$.toggleClass('source', data.isCode);

        Header.render(data);
        Content.render(url);
        Mark.render(data);

      
    });





    return panel.wrap({

        //显示大纲
        'outline': Content.outline,
    });

});
