
define('/Sidebar/Groups', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');


    var panel = KISP.create('Panel', '#ul-sidebar-groups');
    var list = [];


    panel.on('init', function () {

        panel.template(['item'], function (group, no) {

            return {
                data: {
                    'name': group.name,
                },

                list: group.items,

                fn: function (item, index) {
                    return {
                        data: {
                            'index': index,
                            'name': item.name,
                            'no': no,            //组号
                        },
                    };
                },
            };

        });

        panel.$.on('click', 'li[data-index]', function () {
            var li = this;
            var index = +li.getAttribute('data-index');
            var no = +li.getAttribute('data-no');
            var id = no + '.' + index;

            panel.fire('item', [id]);

        });

    });

    panel.on('render', function (data) {
        list = data;
        panel.fill(data);
    });



    return panel.wrap({

        'active': function (id) {
            var args = id.split('.');
            var no = args[0];
            var index = args[1];

            var group = list[no];
            var item = group.items[index];

            var selector = $.String.format('li[data-index="{0}"][data-no="{1}"]', index, no);
            panel.$.find('li.on').removeClass('on');
            panel.$.find(selector).addClass('on');

            panel.fire('active', [group, item]);
         
        },
    });

});
