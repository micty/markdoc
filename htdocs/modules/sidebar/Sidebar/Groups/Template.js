
define('/Sidebar/Groups/Template', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var $String = KISP.require('String');



    return {
        get: function () {
            var tplIcon = null;

            return {
                '': function (data) {
                    tplIcon = this.template('icon');
                 
                    var html = this.fill('group', data.groups);

                    return {
                        'groups': html,
                    };
                },

                'icon': function (item, no, index) {
                    var icon = item.icon;

                    if (!icon) {
                        return '';
                    }

                    var id = typeof index == 'number' ? `${no}-${index}` : `${no}`;

                    return {
                        'icon': icon,
                        'id': id,
                    };
                },

                'group': {
                    '': function (group, no) {
                        var html = this.fill('item', group.items, no);
                        var icon = tplIcon.fill(group, no);

                        return {
                            'no': no,
                            'icon': icon.trim(),
                            'name': group.name,
                            'title-display': group.name ? '' : 'display: none;',
                            'items-display': group.fold ? 'display: none;' : '',
                            'up-down': group.fold ? 'down' : 'up',
                            'items': html,
                        };
                    },

                    'item': {
                        '': function (item, index, no) {
                            var icon = tplIcon.fill(item, no, index);

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
