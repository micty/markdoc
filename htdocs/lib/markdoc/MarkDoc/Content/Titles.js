
/**
* 标题相关的。
*/
define('MarkDoc/Content/Titles', function (require, module, exports) {
    const $ = require('$');
    const $String = require('@definejs/string');


    return {
        /**
        * 
        */
        init: function (meta) {
            let panel = meta.panel;
            let titles = meta.titles;
            let selector = titles.selector;


            if (titles.foldable) {
                //点击标题时。
                panel.$on('click', {
                    [selector]: function (event) {

                        $(this).nextUntil(selector).animate({
                            height: 'toggle',
                            opacity: 'toggle',
                        });
                    },
                });
            }

           

          
        },

        /**
        * 
        */
        fill: function (meta, data) {
            let id = $String.random();  //生成一个随机 id。
            let level = data.level;
            let html = data.text;       //这里其实是一个 innerHTML。
            let text = html;

            //尝试取出真正的 innerText。
            try {
                text = $(`<p>${html}</p>`).text(); // html 可能不是一个有效的 html 内容。
            }
            catch (ex) {
                text = html;
            }

            let item = {
                'id': `h${level}-${id}`, //如 `h3-B6C0E2B69744`
                'level': level,
                'html': html,           //
                'text': text || html,   //取出 innerText 可能为空，此时表明它不包含 html 内容。
                'raw': data.raw,
            };


            let html2 = meta.tpl.fill('title', item);

            //收集提纲信息。
            meta.outlines.push(item);

            return html2;
        },

        /**
        * 
        */
        render: function (meta) {
            let panel = meta.panel;
            let selector = meta.titles.selector;

            panel.$.find(selector).each(function () {
                let $this = $(this);
                let list = $this.nextUntil(selector);
               
                $this.toggleClass('title', list.length > 0);

            });

        },
    };
    
});


