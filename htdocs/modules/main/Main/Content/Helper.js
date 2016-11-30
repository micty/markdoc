
/**
*/
define('/Main/Content/Helper', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var marked = require('marked');
    var Highlight = require('Highlight');
    var JSON = require('JSON');

    var Lines = module.require('Lines');
    var Url = module.require('Url');


    return {

        /**
       * 给指定的 DOM 元素填充 markdown 内容。
       * @param {DOMElement} el 要填充的 DOM 元素，markdown 的内容将会填充到该元素里面。
       * @param {string} markdown 内容。
       * @param {string} 内容里的超链接中的相对 url
       */
        'fill': function (config) {

            var container = $(config.container);
            var html = marked(config.content);

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
            //把 href 中以 `#` 或 `?` 开头的 a 标签的 target 值改成 `_self`
            container.find('a').each(function () {
                var a = this;

                //不要用 a.href，因为 a.href 在浏览器中会给自动补充成完整的 url，而我们是要获取最原始的。
                var href = a.getAttribute('href');

                if (href.startsWith('#') || href.startsWith('?')) {
                    a.setAttribute('target', '_self');
                }

                href = Url.getHref(href, config.baseUrl);
                href = Url.getHash(href);

                a.setAttribute('href', href);

            });


        },
    };


});
