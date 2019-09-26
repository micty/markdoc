
/**
* 
*/
define('MarkDoc/Content', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var marked = require('marked');

    var Code = module.require('Code');
    var Href = module.require('Href');
    var Image = module.require('Image');
    var Titles = module.require('Titles');

    var renderer = new marked.Renderer();
   




    return {

        /**
        * 
        */
        init: function (meta) {
            Titles.init(meta);
            Code.init(meta);
            Href.init(meta);

        },



        /**
        * 渲染生成 html 内容，并设置必要的样式。
        */
        render: function (meta, opt) {
            var language = opt.language;
            var content = opt.content;
            var process = meta.process;
            var panel = meta.panel;

            meta.outlines = [];

            if (language) {
                content = [
                    '``` ' + language,
                        content,
                    '```',
                ].join('\r\n');
            }


            //生成标题（提纲）。
            renderer.heading = function (text, level, raw, slugger) {

                var html = Titles.fill(meta, {
                    'level': level,
                    'text': text,
                    'raw': raw,
                });

                return html;
            };


            //生成代码区。
            renderer.code = function (content, language) {

                var html = Code.fill({
                    'tpl': meta.tpl,
                    'content': content,
                    'language': language,
                    'format': meta.code.format,
                });

                return html;
            };

            


            content = marked(content, {
                'renderer': renderer,
            });



            //让外界有机会进一步处理内容。
            if (process) {
                content = process(content);
            }


            panel.$.html(content);
            panel.$.addClass('MarkDoc');
            panel.$.toggleClass('SourceMode', !!language);  //源码模式。 如果指定语言，则当成源代码模式。

            Titles.render(meta);
            Image.render(meta, opt);
            Href.render(meta, opt);

            
        },


        
    };
    
});


