
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

    var current = {
        'url': null,
        'visible': false,   //记录 sidebar 是否可见。
        'config': null,
    };


    function setPadding(visible) {

        if (!visible) { //sidebar 是否可见。
            panel.$.css('padding-right', '');
            return;
        }

        var w = document.documentElement.clientWidth;
        var max = 260 + 52 + 1024;
        var p = w - max;

        p = Math.min(p, 260 + 52);
        p = Math.max(p, 52);

        panel.$.css('padding-right', p + 'px');
    }
    

    panel.on('init', function () {

        $(window).on('resize', function () {
            if (current.visible) {
                setPadding(true);
            }
        });

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

            'render': function (title) {
                Loading.hide();

                var isCode = current.url.isCode;
                if (isCode) {
                    title = current.url.name + ' 源代码';
                }

                panel.fire('render', [isCode, title]);
            },

            'line': function (y) {
                Mark.render(y, current.config.fadeIn);
            },

            'hash': function (hash) {
                panel.fire('hash', [hash]);
            },
        });

        panel.$.on('click', function () {
            panel.fire('click');
        });

    });


    panel.on('render', function (url, isSidebarVisible) {

        var data = current.url = Url.parse(url);
        

        panel.$.toggleClass('source', data.isCode);

 
        Header.render(data);
        Content.render(url, current.config.fadeIn);
        Mark.render(data);
        NotFound.hide();

        current.visible = isSidebarVisible;
        setPadding(isSidebarVisible);
    });



    return exports = panel.wrap({

        //显示大纲
        'outline': Content.outline,

        'loading': function () {
            panel.$.removeClass('source');
            Content.hide();
            NotFound.hide();
            Loading.show();
        },

        'notfound': function (file, data) {
            data = data || {};

            panel.$.removeClass('source');
            Header.hide();
            Content.hide();
            Loading.hide();
            Mark.hide();

            //避免跟 Content.loading 事件竞争。
            setTimeout(function () {
                Loading.hide();
                NotFound.render(file, data);
            }, 100);

   
            setPadding(data.visible);
        },

        'config': function (config) {
            current.config = config;
        },
       
        'leave': function (sw) {
            Header.leave(sw);

            if (current.url.isCode) {
                Content.$.toggleClass('header-fixed', sw);
            }
        },

        //Header 显示/隐藏时，调整 top 距离
        'setTop': function (isHeaderVisible) {
            panel.$.parent().toggleClass('no-header', !isHeaderVisible);
        },
    });

});
