
/**
* 
*/
define('MarkDoc/Content', function (require, module, exports) {

    var $ = require('$');
    var KISP = require('KISP');
    var $String = KISP.require('String');

    var marked = window.marked;


    return {

        /**
        * 获取内容。
        *   options = {
        *       //必选，要填充的内容。
        *       content: '',    
        *
        *       //可选，语言类型，如 `html`、`json`、`js` 等。 
        *       //如果要使用源代码模式显示内容，则需要指定该字段。 
        *       language: '',   
        *
        *       //内容转换函数。
        *       process: function(content) { 
        *           return content;     
        *       },
        *   };
        */
        get: function (meta, options) {
            var language = options.language;
            var content = options.content;
            var process = options.process;

            //html 源文件要特殊处理。
            if (language == 'html' || language == 'htm') {
                language = '';

                content = [
                    '``` html',
                        content,
                    '```',
                ].join('\r\n');
            }


            //指定了语言类型，则当成源代码来展示。
            if (language) {
                content = $String.format(meta.samples['pre'], {
                    'language': language,
                    'content': content,
                });
            }
            else { //否则，当成 markdown 内容，解析成 html。
                content = marked(content);

                //让外界有机会进一步处理内容。
                if (process) {
                    content = process(content);
                }
            }

            return content;
        },


        
    };
    
});


