
define('/Sidebar/Groups/Template', function (require, module, exports) {

    return {
        get: function () {
            let tplIcon = null;

            return {
                '': function (data) {
                    tplIcon = this.template('icon');
                 
                    let html = this.fill('group', data.groups);

                    return {
                        'groups': html,
                    };
                },

                'icon': function (item, no, index) {
                    let icon = item.icon;

                    if (!icon) {
                        return '';
                    }

                    let id = typeof index == 'number' ? `${no}-${index}` : `${no}`;

                    return {
                        'icon': icon,
                        'id': id,
                    };
                },

                'group': {
                    '': function (group, no) {
                        let html = this.fill('item', group.items, no);
                        let icon = tplIcon.fill(group, no);

                        return {
                            'no': no,
                            'icon': icon.trim(),
                            'name': group.name,
                            'has-title': group.name ? '' : 'no-title',
                            'items-display': group.fold ? 'display: none;' : '',
                            'up-down': group.fold ? 'down' : 'up',
                            'items': html,
                        };
                    },

                    'item': {
                        '': function (item, index, no) {
                            let icon = tplIcon.fill(item, no, index);

                            return {
                                'index': index,
                                'icon': icon.trim(),
                                'name': item.name,
                                'no': no,            //组号
                            };
                        },
                    },
                },

            };
        },
    };


});
