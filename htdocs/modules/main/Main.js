
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
            'click': function () {
                Mark.hide();
            },
        });

        Content.on({
            'render': function () {
                panel.fire('render', [current]);
            },

            'line': function (y) {
                Mark.set(y);
            },
        });

    });


    panel.on('render', function (url) {

        if (typeof url == 'object') {
            var file = url.file;
            var dir = url.dir;
        }


        var info = current = Url.parse(url);
        panel.$.toggleClass('source', info.isCode);

        Header.render(info);
        Content.render(url);
        Mark.hide();
      
    });





    return panel.wrap({

        //显示大纲
        'outline': Content.outline,
    });

});
