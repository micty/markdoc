
/**
* markdoc 内容渲染器。
*/
define('MarkDoc', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    var $Object = KISP.require('Object');
    var Emitter = KISP.require('Emitter');
    var Meta = module.require('Meta');
    var Content = module.require('Content');


    var mapper = new Map();
    var defaults = require(`${module.id}.defaults`);



    /**
    * 构造器。
    *    opt = {
    *        container: '',     //要填充的 DOM 元素，内容将会填充到该元素里面。
    *    };
    */
    function MarkDoc(config) {
        config = $Object.extendDeeply({}, defaults, config);

        var emitter = new Emitter(this);

        var meta = Meta.create(config, {
            'this': this,
            'emitter': emitter,
        });

        var panel = meta.panel;


        mapper.set(this, meta);

        Object.assign(this, {
            'id': meta.id,      //
            '$': panel.$,        //
            'data': {},         //用户的自定义数据容器。
        });

        //插件机制，替换指定的内容。
        if (meta.replace) {
            this.on('process', function (content) {
                $Object.each(meta.replace, function (key, value) {
                    content = content.split(key).join(value);
                });

                return content;
            });
        }


        panel.on('init', function () {
            Content.init(meta);
        });

        panel.on('render', function (fn) {
            fn();
        });

        panel.on('show', function () {
            emitter.fire('show');
        });

        panel.on('hide', function () {
            emitter.fire('hide');
        });
    }












    //实例成员。
    MarkDoc.prototype = {
        constructor: MarkDoc,

        /**
        * 对传入的容器的 jQuery 对象包装，即 $(container)。
        */
        $: null,

        /**
        * 用户的自定义数据容器。
        */
        data: {},

        /**
        * 渲染生成 markdoc 内容。
        *   opt = {
        *       content: '',    //必选，要填充的 markdown 内容。
        *       language: '',   //可选，语言类型，如 `json`、`javascript` 等。 如果指定，则当成源代码模式展示内容。
        *       baseUrl: '',    //可选，内容里的图片和超链接中的基准 url。 
        *                           如果指定，则会相对于该字段补充完整 url。 
        *                           普通模式下可用，即非源代码模式。
        *
        *       code: {             //可选，针对代码区域的控制项。
        *           format: true,   //可选，是否自动格式化（针对 JSON）。
        *           type: true,     //可选，是否显示语言类型标签。
        *           numbers: true,  //可选，是否显示行号。
        *           foldable: true, //可选，是否允许通过点击语言类型标签来切换折叠和展开代码区。
        *           line: true,     //可选，是否高亮显示当前选中的行。
        *       },

        *       titles: {           //可选，针对标题区域的控制项。
        *           selector: '',   //可选，标题的选择器，默认为 `h1,h2,h3,h4,h5,h6`。
        *           foldable: true, //可选，是否允许折叠。
        *       },
        *       
        *   };
        */
        render: function (opt) {
            var meta = mapper.get(this);

            //提供一个机会可以在 render 时重新传配置。
            Object.assign(meta.code, opt.code);
            Object.assign(meta.titles, opt.titles);



            meta.panel.render(function () {
                Content.render(meta, opt);          //初步生成 html 内容。

                meta.emitter.fire('render', [{
                    'id': meta.id,
                    'outlines': meta.outlines,
                }]);

            });


        },

        /**
        * 显示本组件。
        */
        show: function () {
            var meta = mapper.get(this);
            meta.panel.show();
        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            var meta = mapper.get(this);
            meta.panel.hide();
        },

        /**
        * 绑定事件。
        */
        on: function () {
            var meta = mapper.get(this);
            meta.emitter.on(...arguments);
        },

        /**
        * 滚动到指定索引值的提纲。
        */
        toOutline: function (index) {
            var meta = mapper.get(this);
            var el = meta.panel.$.find(meta.titles.selector).get(index);

            if (!el) {
                return;
            }


            if (el.scrollIntoViewIfNeeded) {
                el.scrollIntoViewIfNeeded();
            }
            else {//兼容一下低端浏览器。
                el.scrollIntoView();
            }

            //闪两次
            var timeout = 180;
            var $el = $(el);

            $el.addClass('on');

            setTimeout(function () {
                $el.removeClass('on');

                setTimeout(function () {
                    $el.addClass('on');

                    setTimeout(function () {
                        $el.removeClass('on');
                    }, timeout);

                }, timeout);

            }, timeout);

        },

    };


   

    return MarkDoc;


});
