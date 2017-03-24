
/**
*/
define('/Main/Content/Helper', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var marked = require('marked');
    var JSON = require('JSON');

    var Highlight = module.require('Highlight');
    var Lines = module.require('Lines');
    var Url = module.require('Url');


    var current = {
        'html': '',
        'code': null,   //代码区
        'ul': null,     //行号列表
    };


    return {

        /**
       * 给指定的 DOM 元素填充 markdown 内容。
       * @param {DOMElement} el 要填充的 DOM 元素，markdown 的内容将会填充到该元素里面。
       * @param {string} markdown 内容。
       * @param {string} 内容里的超链接中的相对 url
       */
        'fill': function (config) {

            var container = $(config.container);
            var html = config.content;

            if (config.isOrigin) {
                html = '<pre><code data-language="' + config.ext + '" class="hljs">' + html + '</code></pre>';
            }
            else {
                html = marked(html);
            }



            container.addClass('Markdown').html(html);


            //在语法高亮之前做代码的美化
            container.find('code[data-language]').each(function () {
              
                var code = this;
                var language = code.getAttribute('data-language');
                var text = code.innerText;

                //尝试把 json 格式化一下
                if (language == 'json') {
                    var json = JSON.parse(text);
                    if (json) {
                        json = JSON.stringify(json, 4);
                        text = code.innerHTML = json; //要回写到 text，因为下面可能会用到
                    }
                }

                //对源代码添加行号显示
                var html = Lines.getNumbers(text);
                html = '<span>' + language + '</span>' + html;

                var height = Lines.getHeight(text);
                var pre = code.parentNode;

                $(pre).wrap('<div class="source-code"></div>')
                    .before(html)
                    .height(height);     //设置高度，以撑开高度
            });


            //语法高亮
            Highlight.auto(container);



            //改写 a 标签。
            container.find('a').each(function () {
                var a = this;

                //不要用 a.href，因为 a.href 在浏览器中会给自动补充成完整的 url，而我们是要获取最原始的。
                var href = a.getAttribute('href');
          
                if (href.startsWith('#') || href.startsWith('?')) {
                    a.setAttribute('target', '_self');
                }

                if (href.startsWith('?')) {
                    href = Url.getHref(href, config.baseUrl);
                    href = Url.getHash(href);
                    a.setAttribute('href', href);
                }
               

            });


            container.find('h1,h2,h3,h4,h5,h6').each(function () {
                $(this).wrapInner('<span></span>');
            });


            current.code = container.find('pre>code');
            current.html = current.code.html();
            current.ul = container.find('ul');

        },

        /**
        * 隐藏或显示空行。
        */
        'empty': function (checked) {

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

            lines = $.Array.map(lines, function (line) {
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

        
    };


});
