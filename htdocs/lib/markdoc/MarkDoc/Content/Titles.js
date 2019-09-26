
/**
* 标题相关的。
*/
define('MarkDoc/Content/Titles', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var $String = KISP.require('String');
    var JSON = KISP.require('JSON');


    return {
        /**
        * 
        */
        init: function (meta) {
            var panel = meta.panel;
            var titles = meta.titles;
            var selector = titles.selector;


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
            var id = $String.random();  //生成一个随机 id。
            var level = data.level;
            var html = data.text;       //这里其实是一个 innerHTML。
            var text = html;

            //尝试取出真正的 innerText。
            try {
                text = $(`<p>${html}</p>`).text(); // html 可能不是一个有效的 html 内容。
            }
            catch (ex) {
                text = html;
            }

            var item = {
                'id': `h${level}-${id}`, //如 `h3-B6C0E2B69744`
                'level': level,
                'html': html,           //
                'text': text || html,   //取出 innerText 可能为空，此时表明它不包含 html 内容。
                'raw': data.raw,
            };


            var html2 = meta.tpl.fill('title', item);

            //收集提纲信息。
            meta.outlines.push(item);

            return html2;
        },

        /**
        * 
        */
        render: function (meta) {
            var panel = meta.panel;
            var selector = meta.titles.selector;

            panel.$.find(selector).each(function () {
                var $this = $(this);
                var list = $this.nextUntil(selector);
               
                $this.toggleClass('title', list.length > 0);

            });

        },
    };
    
});


