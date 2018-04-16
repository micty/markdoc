
/**
* markdoc 内容渲染器。
*/
define('MarkDoc', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    var $Array = KISP.require('Array');
    var $String = KISP.require('String');
    var Emitter = KISP.require('Emitter');
    var Template = KISP.require('Template');

    var marked = require('marked');
    var JSON = require('JSON');

    var Meta = module.require('Meta');
    var Content = module.require('Content');
    var Events = module.require('Events');
    var Titles = module.require('Titles');
    var Href = module.require('Href');

    var Code = module.require('Code');
    var Highlight = module.require('Highlight');
    var Lines = module.require('Lines');
    var Url = module.require('Url');

    var mapper = new Map();





    /**
    * 构造器。
    *    options = {
    *        container: '',     //要填充的 DOM 元素，内容将会填充到该元素里面。
    *    };
    */
    function MarkDoc(config) {

        var emitter = new Emitter(this);

        var meta = Meta.create(config, {
            'this': this,
            'emitter': emitter,
        });

        mapper.set(this, meta);

        Object.assign(this, {
            'id': meta.id,
            '$': meta.$,
            'data': {},     //用户的自定义数据容器。
        });

    }


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
        *   options = {
        *       content: '',        //必选。 要填充的内容。
        *       language: '',       //可选。 语言类型，如 `json`、`javascript` 等。 如果指定，则当成源代码模式展示内容。
        *       baseUrl: '',        //内容里的超链接中的相对 url。 非源代码模式下可用。
        *   };
        */
        render: function (options) {
            var meta = mapper.get(this);
            var current = meta.current;
            var isSourceMode = !!options.language; //如果指定，则当成源代码模式展示内容。

            var content = Content.get(meta, {
                'language': options.language,
                'content': options.content,
            });


            meta.$.html(content);
            meta.$.addClass('MarkDoc');
            meta.$.toggleClass('SourceMode', isSourceMode);
            meta.outline.visible = true; //每次填充都要重置。



            //首次绑定。
            if (!meta.bind) {
                Events.bind(meta);

    
            }


            Code.each(meta.$, function (item, index) {
                var element = item.element;
                var language = item.language;
                var code = meta.code;

                //尝试把 json 格式化一下。
                if (code.format) {
                    Code.format(element);
                }

                var content = element.innerText; //在格式化后重新获取。
                
                var height = Lines.getHeight(content);

                Code.wrap(meta, {
                    'element': element,
                    'height': height,
                    'language': code.language ? Code.language(meta, language) : '', //添加语言类型标签。
                    'numbers': code.numbers ? Lines.getNumbers(meta, content) : '', //对源代码添加行号显示。
                });


                //语法高亮
                content = Highlight.highlight(language, content);
                $(element).addClass('hljs').html(content);

            });

            var title = Titles.render(meta);


            if (!isSourceMode) {
                Href.format(meta, options.baseUrl);
            }


            current.code = meta.$.find('pre>code');
            current.html = current.code.html();
            current.ul = meta.$.find('ul');

            return title;

        },

        /**
        * 显示本组件。
        */
        show: function () {
            var meta = mapper.get(this);
        
            meta.$.show(...arguments);
            meta.emitter.fire('show');

        },

        /**
        * 隐藏本组件。
        */
        hide: function () {
            var meta = mapper.get(this);

            meta.$.hide(...arguments);
            meta.emitter.fire('hide');
        },

        /**
        * 切换显示或隐藏提纲。
        */
        outline: function () {
            var meta = mapper.get(this);
            var $ = meta.$.find('>*:not(' + meta.titles.selector + ')');
            var value = meta.outline.visible ? 'hide' : 'show';

            $.animate({
                'height': value,
                'opacity': value,
            }, 'fast');

            meta.outline.visible = !meta.outline.visible;
        },

        /**
        * 隐藏或显示空行。
        */
        empty: function (checked) {
            var meta = mapper.get(this);
            var current = meta.current;

            var code = current.code;
            var ul = current.ul;
            var html = current.html;

            //显示空行。
            if (checked) {
                //重新计算高度。
                var height = Lines.getHeight(html);
                code.parent().height(height);
                ul.find('li').show();
                code.html(html);
                return;
            }

            //隐藏空行。
            var html = code.html();
            var lines = html.split(/\r\n|\n|\r/);

            lines = $Array.map(lines, function (line) {
                return line.length > 0 ? line : null;
            });

            html = lines.join('\r\n');
            code.html(html);


            //重新计算高度。
            var height = Lines.getHeight(html);
            code.parent().height(height);

            //隐藏多余的行号
            var maxIndex = lines.length - 1;
            ul.find('li').show();
            ul.find('li:gt(' + maxIndex + ')').hide();
        },

        /**
        * 绑定事件。
        */
        on: function () {
            var meta = mapper.get(this);
            meta.emitter.on(...arguments);
        },

    };


   

    return MarkDoc;


});