
/**
* 
*/
define('MarkDoc/Content', function (require, module, exports) {
    const marked = module.require('marked');

    const Code = module.require('Code');
    const Href = module.require('Href');
    const Image = module.require('Image');
    const Titles = module.require('Titles');

    let renderer = new marked.Renderer();
   




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
            let language = opt.language;
            let content = opt.content;
            let process = meta.process;
            let panel = meta.panel;

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

                let html = Titles.fill(meta, {
                    'level': level,
                    'text': text,
                    'raw': raw,
                });

                return html;
            };


            //生成代码区。
            renderer.code = function (content, language) {

                let html = Code.fill({
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


