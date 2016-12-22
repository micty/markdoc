
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
                    'no': no,
                    'name': group.name,
                    'display': group.fold ? 'display: none;' : '',
                    'up-down': group.fold ? 'down' : 'up',
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

        panel.$.on('click', '[data-type="group"]', function () {
        
            var div = this;
            var no = +div.getAttribute('data-no');
            var ul = 'ul[data-no="' + no + '"]';

            panel.$.find(ul).slideToggle('fast', function () {
                $(div).find('i').toggleClass('fa-angle-double-down fa-angle-double-up');
            });



        });

        panel.$.on('click', '[data-type="item"]', function () {
            var li = this;
            var index = +li.getAttribute('data-index');
            var no = +li.getAttribute('data-no');
            var id = no + '/' + index;

            panel.fire('item', [id]);

        });

    });

    panel.on('render', function (data) {
        list = data;
        panel.fill(data);
        panel.fire('render');
    });



    return panel.wrap({

        'active': function (id) {

            //取消激活。
            if (id === false) {
                panel.$.find('li.on').removeClass('on');
                return;
            }


            var args = id.split('/');
            var no = args[0];
            var index = args[1];

            var group = list[no];
            var item = group.items[index];

            var selector = $.String.format('li[data-index="{0}"][data-no="{1}"]', index, no);
            var li = panel.$.find(selector);

            panel.$.find('li.on').removeClass('on');

            li.addClass('on');
            li.get(0).scrollIntoViewIfNeeded();

            panel.fire('active', [group, item]);


         
        },

    });

});
