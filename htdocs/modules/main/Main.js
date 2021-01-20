
KISP.panel('/Main', function (require, module, panel) {
    const $ = require('$');

    const NotFound = module.require('NotFound');
    const Loading = module.require('Loading');
    const Header = module.require('Header');
    const Content = module.require('Content');
    const Style = module.require('Style');
    const Url = module.require('Url');


    let meta = {
        'urlInfo': null,
        'sidebar': false,   //记录 sidebar 是否可见。
        'outline': false,   //记录 outline 是否可见。
        'config': {
            'fadeIn': true,
            'outline': false,   //提纲栏是否自动显式。 
            'min-width': 750,
            'max-width': 1024,
        },
    };



    panel.on('init', function () {
        Style.init(panel);

        $(window).on('resize', function () {
            Style.setPadding({
                'sidebar': meta.sidebar,
                'outline': meta.outline,
            });
        });

        Header.on({
            'numbers': function (checked) {
                panel.$.toggleClass('no-numbers', !checked);
            },
            'comment': function (checked) {
                panel.$.toggleClass('no-comment', !checked);
            },
        });

        Content.on({
            //这个事件会给delay 100ms 触发。
            'loading': function () {
                Loading.show();
            },

            'render': function (data) {
                let isCode = meta.urlInfo.isCode;
                let title = data.title;
                let outline = meta.config.outline;  //是否自动显示提纲 true|false。

                if (isCode) {
                    title = meta.urlInfo.name + ' 源代码';
                    outline = false;
                }


                Loading.hide();

                panel.fire('render', [{
                    'isCode': isCode,
                    'title': title,
                    'outlines': data.outlines, //提纲列表数据 []。
                    'outline': outline,
                }]);
            },



            'hash': function (hash) {
                panel.fire('hash', [hash]);
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
    *   };
    */
    panel.on('render', function (options) {
        meta.sidebar = options.sidebar;
        meta.urlInfo = Url.parse(options.url);

        let isCode = meta.urlInfo.isCode;


        //切换普通模式和代码模式。
        panel.$.toggleClass('source', isCode);
 
        //针对代码模式的头部工具栏，仅代码模式时显示。
        Header.render(meta.urlInfo);


        Content.render({
            'url': options.url,
            'fadeIn': meta.config.fadeIn,
        });

      
        NotFound.hide();

        Style.setPadding({
            'sidebar': meta.sidebar,
            'outline': meta.outline,
        });

        Style.setWidth({
            'isCode': isCode,
            'min-width': meta.config['min-width'],
            'max-width': meta.config['max-width'],
        });
    });






    return {

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
            Object.assign(meta.config, config);
        },

        'leave': function (sw) {
            Header.leave(sw);

            if (meta.urlInfo.isCode) {
                Content.$.toggleClass('header-fixed', sw);
            }
        },

        /**
        * Header 显示或隐藏时，调整 top 距离。
        */
        'setTop': function (isHeaderVisible) {
            panel.$.parent().toggleClass('no-header', !isHeaderVisible);
        },

        /**
        * 设置 padding-right。
        *   options = {
        *       outline: false,     //提纲栏是否可见。
        *   };
        */
        'setPadding': function (options) {
            options = options || {};
            meta.outline = options.outline;

            Style.setPadding({
                'sidebar': meta.sidebar,
                'outline': meta.outline,
            });
        },

        /**
        * 滚动到指定索引的提纲处。
        */
        'toOutline': function (index) {
            Content.toOutline(index);
        },

        'font': function (size) {
            Content.font(size);
        },
    };

});
