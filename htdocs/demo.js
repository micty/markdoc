


var Template = KISP.require('Template');
var tpl = new Template('#tpl');

console.log(tpl);
//var sample = tpl.sample('group');
//console.log(sample);

tpl.process(function (data) {
    var groups = this.fill('group', data.groups);

    return {
        'groups': groups,
    };
});


tpl.process('group', function (group, no) {
    var items = this.fill('item', group.items);

    return {
        'title': group.title,
        'items': items,
    };

});



tpl.process('group', 'item', function (item, index) {
    return {
        'name': 'a' + item.name,
        'qq': item.qq,
    };

});

tpl.process({
    '': function (data) {
        var groups = this.fill('group', data.groups);

        return {
            'groups': groups,
        };
    },
    'group': {
        '': function (group, no) {
            var items = this.fill('item', group.items);

            return {
                'title': group.title,
                'items': items,
            };

        },
        'item': function (item, index) {
            return {
                'name': 'a' + item.name,
                'qq': item.qq,
            };

        }
    },

});


var html = tpl.fill({
    groups: [
    	{
    	    title: '我的好友',
    	    items: [
            	{ name: '张小明', qq: '123456', },
                { name: '李婷', qq: '895632', },
    	    ],
    	},
        {
            title: '我的同学',
            items: [
            	{ name: '王丽', qq: '5623145', },
            ],
        },
    ],
});

console.log(html);