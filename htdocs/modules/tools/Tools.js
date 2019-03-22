
/**
* 右侧固定的工具栏。
*/
KISP.panel('/Tools', function (require, module, panel) {

    var $ = require('$');
    var KISP = require('KISP');

    var list = [];

    var font = {
        list: [14, 16, 18, 20],
        index: 1,
    };
    

    panel.set('show', false);

    panel.on('init', function () {


        panel.$on('click', '[data-cmd="{value}"]', {
            'top': function () {
                scrollTo(0, 0);
            },

            'home': function () {
                location.hash = '#';
            },

            'font': function () {
                var list = font.list;
                var index = font.index + 1;

                if (index >= list.length) {
                    index = 0;
                }

                font.index = index;
                panel.fire('font', [list[index]]);

            },

            'outline': function () {
                panel.fire('outline');
            },

            'print': function () {
                panel.fire('print');
            },

            'bottom': function () {
                scrollTo(0, document.body.scrollHeight);
            },
        });

        panel.template(function (item, index) {
            return {
                'index': index,
                'cmd': item.cmd || '',
                'text': item.text || '',
                'icon': item.icon || '',
            };
        });

    });


   


    panel.on('render', function (items) {
        list = items;

        if (!list || !list.length) {
            panel.hide();
            return;
        }


        panel.fill(list);
        panel.show();

    });


    return {
        set: function (isCode) {
            panel.$.find('[data-cmd="outline"]').toggle(!isCode);
        },
    };


});





    