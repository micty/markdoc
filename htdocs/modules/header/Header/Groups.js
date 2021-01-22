
define.panel('/Header/Groups', function (require, module, panel) {
    const $ = require('$');


    let list = [];


    panel.on('init', function () {

        let tplIcon = null;


        panel.template({
            '': function (data) {
                tplIcon = this.template('icon');

                let html = this.fill('group', data.groups);

                return {
                    'groups': html,
                };
            },

            'icon': function (item) {
                let icon = item.icon;
                if (!icon) {
                    return '';
                }

                return {
                    'icon': icon,
                };
            },

            'group': {
                '': function (group, no) {
                    let items = group.items || [];
                    let html = this.fill('item', items, no);
                    let icon = tplIcon.fill(group);

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
                        let icon = tplIcon.fill(item);

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
            let li = this;
            let index = +li.getAttribute('data-index');
            let no = +li.getAttribute('data-no');
            let group = list[no];
            let item = group.items[index];

            panel.fire('item', [item]);

            event.stopPropagation();

            panel.$.find(`[data-type="group"][data-no="${no}"]`).removeClass('on');

        });




        panel.$bind('[data-type="group"]', {
            'click': function (event) {
                let li = this;
                let no = +li.getAttribute('data-no');
                let group = list[no];
                panel.fire('group', [group]);
            },

            'mouseover': function (event) {
                let li = this;
                $(li).addClass('on');
            },

            'mouseleave': function (event) {
                let li = this;
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
            let args = id.split('.');
            let no = args[0];
            let index = args[1];

            let group = list[no];
            let item = group.items[index];

            let selector = $.String.format('li[data-index="{0}"][data-no="{1}"]', index, no);
            panel.$.find('li.on').removeClass('on');
            panel.$.find(selector).addClass('on');

            panel.fire('active', [group, item]);

        },
    };

});
