
KISP.panel('/Header/Groups', function (require, module, panel) {

    var $ = require('$');
    var KISP = require('KISP');


    var list = [];


    panel.on('init', function () {

        var tplIcon = null;


        panel.template({
            '': function (data) {
                tplIcon = this.template('icon');

                var html = this.fill('group', data.groups);

                return {
                    'groups': html,
                };
            },

            'icon': function (item) {
                var icon = item.icon;
                if (!icon) {
                    return '';
                }

                return {
                    'icon': icon,
                };
            },

            'group': {
                '': function (group, no) {
                    var items = group.items || [];
                    var html = this.fill('item', items, no);
                    var icon = tplIcon.fill(group);

                    return {
                        'no': no,            //组号
                        'icon': icon.trim(),
                        'name': group.name,
                        'class': items.length > 0 ? 'group' : '',
                        'items': html,
                    };
                },


                'item': {
                    '': function (item, index, no) {
                        var icon = tplIcon.fill(item);

                        return {
                            'index': index,
                            'icon': icon.trim(),
                            'name': item.name,
                            'no': no,            //组号
                        };
                    },
                },
            },

        });




        panel.$.on('click', '[data-type="item"]', function (event) {
            var li = this;
            var index = +li.getAttribute('data-index');
            var no = +li.getAttribute('data-no');
            var group = list[no];
            var item = group.items[index];

            panel.fire('item', [item]);

            event.stopPropagation();

            panel.$.find(`[data-type="group"][data-no="${no}"]`).removeClass('on');

        });




        panel.$bind('[data-type="group"]', {
            'click': function (event) {
                var li = this;
                var no = +li.getAttribute('data-no');
                var group = list[no];
                panel.fire('group', [group]);
            },

            'mouseover': function (event) {
                var li = this;
                $(li).addClass('on');
            },

            'mouseleave': function (event) {
                var li = this;
                $(li).removeClass('on');
            },
        });



    });




    panel.on('render', function (data) {
        list = data;
        panel.fill({ 'groups': list, });
    });



    return {

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
    };

});
