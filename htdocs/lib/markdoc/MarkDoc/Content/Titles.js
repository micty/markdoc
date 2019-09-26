
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
            var item = {
                'id': $String.random(),     //生成一个随机 id。
                'level': data.level,
                'text': data.text,
                'raw': data.raw,
            };

            var html = meta.tpl.fill('title', item);

            //收集提纲信息。
            meta.outlines.push(item);

            return html;
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


