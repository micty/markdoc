
define('/Header/Groups', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');


    var panel = KISP.create('Panel', '#ul-header-groups');
    var list = [];


    panel.on('init', function () {

        panel.template(['item'], function (group, no) {

            var items = group.items || [];

            return {
                data: {
                    'no': no,            //组号
                    'name': group.name,
                    'class': items.length > 0 ? 'group' : '',
                },

                list: items,

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

        panel.$.on('click', '[data-type="group"]', function () {
            var li = this;
            var no = +li.getAttribute('data-no');
            var group = list[no];
            panel.fire('group', [group]);

        });

        panel.$.on('click', '[data-type="item"]', function (event) {
            var li = this;
            var index = +li.getAttribute('data-index');
            var no = +li.getAttribute('data-no');
            var group = list[no];
            var item = group.items[index];

            panel.fire('item', [item]);

            event.stopPropagation();

            panel.$.find('[data-type="group"][data-no="' + no + '"]').removeClass('on');

        });


        var tid = null;

        panel.$.on('mouseover', '[data-type="group"]', function () {
            clearTimeout(tid);
            var li = this;
            $(li).addClass('on');
        });

        panel.$.on('mouseleave', '[data-type="group"]', function () {
            var li = this;
            $(li).removeClass('on');

            tid = setTimeout(function () {
            }, 1000);
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
