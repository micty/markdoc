
KISP.panel('/Main', function (require, module, panel) {
    var $ = require('$');
    var KISP = require('KISP');

    var NotFound = module.require('NotFound');
    var Loading = module.require('Loading');
    var Header = module.require('Header');
    var Content = module.require('Content');
    var Mark = module.require('Mark');
    var Style = module.require('Style');
    var Url = module.require('Url');


    var meta = {
        'url': null,
        'sidebar': false,   //记录 sidebar 是否可见。
        'outline': false,   //提纲栏是否可见。
        'config': null,
    };



    panel.on('init', function () {
        Style.init(panel);

        $(window).on('resize', function () {
            
            Style.setPadding(meta);

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
                Mark.toggle(checked);
            },
        });

        Content.on({
            //这个事件会给delay 100ms 触发。
            'loading': function () {
                Loading.show();
            },

            'render': function (title) {
                Loading.hide();

                var isCode = meta.url.isCode;
                if (isCode) {
                    title = meta.url.name + ' 源代码';
                }

                panel.fire('render', [isCode, title]);
            },

            'line': function (y) {
                Mark.highlight(y, meta.config.fadeIn);
            },

            'hash': function (hash) {
                panel.fire('hash', [hash]);
            },

            'outline': function (list) {
                panel.fire('outline', [list]);
            },
        });

        panel.$.on('click', function () {
            panel.fire('click');
        });

    });


    /**
    * 渲染。
    *   options = {
    *       url: '',            //要显示的文件的 url 地址。
    *       sidebar: false,     //侧边栏是否显示。
    *       outline: false,     //提纲栏是否显示。
    *   };
    */
    panel.on('render', function (options) {
        var outline = options.outline;

        //如果未指定，则使用上次的。
        if (outline === undefined) {
            outline = meta.outline;
        }
        else {
            meta.outline = outline;
        }


        var url = options.url;
        var sidebar = meta.sidebar = options.sidebar;
        var data = meta.url = Url.parse(url);
        var isCode = data.isCode;

        //切换普通模式和代码模式。
        panel.$.toggleClass('source', isCode);
 
        //针对代码模式的头部工具栏，仅代码模式时显示。
        Header.render(data);


        Content.render({
            'url': url,
            'fadeIn': meta.config.fadeIn,
        });

        Mark.render(isCode);
        NotFound.hide();
        Style.setPadding(meta);
        Style.setWidth(meta.config, isCode);
    });


    return {

        //显示大纲。 暂时不用了。
        'outline': Content.outline,

        'loading': function () {
            panel.$.removeClass('source');
            Content.hide();
            NotFound.hide();
            Loading.show();
        },

        /**
        *   data = {
        *       no: 0,              //可选。 菜单栏 sidebar 的组号。
        *       index: 0,           //可选。 菜单栏 sidebar 某组内的索引号。
        *       sidebar: false,     //可选。 菜单栏 sidebar 是否可见。
        *   };
        */
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

            Style.init(panel);

            Style.setPadding({
                'outline': false,
                'sidebar': data.sidebar,
            });
        },

        'config': function (config) {
            meta.config = config;
        },

        'leave': function (sw) {
            Header.leave(sw);

            if (meta.url.isCode) {
                Content.$.toggleClass('header-fixed', sw);
            }
        },

        //Header 显示/隐藏时，调整 top 距离
        'setTop': function (isHeaderVisible) {
            panel.$.parent().toggleClass('no-header', !isHeaderVisible);
        },

        /**
        *   options = {
        *       outline: false,     //提纲栏是否可见。
        *   };
        */
        'setPadding': function (options) {
            options = options || {};
            meta.outline = options.outline;

            Style.setPadding(meta);
        },

        'toOutline': function (index) {
            Content.toOutline(index);
        },
    };

});
