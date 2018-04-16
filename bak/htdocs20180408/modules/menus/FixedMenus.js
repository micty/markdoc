
/**
* 右侧固定菜单栏模块
*/
KISP.panel('/FixedMenus', function (require, module, panel) {

    var $ = require('$');
    var KISP = require('KISP');

    var list = [];

    panel.set('show', false);

    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function () {
            var li = this;
            var cmd = li.getAttribute('data-cmd');

            switch (cmd) {

                case 'top':
                    scrollTo(0, 0);
                    break;

                case 'home':
                    location.hash = '#';
                    break;

                case 'outline':
                case 'print':
                    panel.fire(cmd);
                    break;

                case 'bottom':
                    scrollTo(0, document.body.scrollHeight);
                    break;
            }
        });

    });


    panel.on('init', function () {

        panel.template({
            '': function (data) {
                var items = this.fill('item', data.items);

                return {
                    'items': items,
                };
            },

            'item': {
                '': function (item, index) {
                    var arrow = this.fill('arrow', item);

                    return {
                        'arrow': arrow,
                        'cmd': item.cmd,
                        'text': item.text,
                    };
                },

                'arrow': function (item) {
                    var cmd = item.cmd;
                    return cmd == 'top' || cmd == 'bottom' ? this.get('sample') : '';
                },

            },

        });
    });


    panel.on('render', function (data) {
        list = data;

        if (!list || !list.length) {
            panel.hide();
            return;
        }


        this.fill({ 'items': list, });
        panel.show();

    });


    return {
        set: function (isCode) {
            panel.$.find('[data-cmd="outline"]').toggle(!isCode);
        },
    };


});





    