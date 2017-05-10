
define('/Sidebar/Groups', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');


    var panel = KISP.create('Panel', '#ul-sidebar-groups');
    var list = [];
    var mutex = false;

    //展开或折叠指定的组。
    //根据 mutex 字段控制是否使用互斥效果。
    function fold(no, needOpen) {

        if (typeof no == 'object') {
            no = +no.getAttribute('data-no');
        }


        var up = 'fa-angle-double-up';
        var down = 'fa-angle-double-down';
        var selector = '[data-no="' + no + '"]';

        var div = panel.$.find('div' + selector);
        var i = $(div).find('i');

        //没有指定 needOpen，则自动判断。
        if (needOpen === undefined) {
            needOpen = i.hasClass(down);
        }

        fold(no, needOpen);

        if (!mutex) {
            return;
        }


        //实现互斥效果
        list.forEach(function (group, index) {
            if (index == no) { //当前组已处理过。
                return;
            }

            //只有当前组是需要打开时才处理其它组。 
            //即，如果当前组是由打开到关闭的，则不处理其它组。
            if (needOpen) { 
                fold(index, !needOpen);
            }
        });


        //内部方法。
        function fold(no, open) {
            var selector = '[data-no="' + no + '"]';
            var div = 'div' + selector;
            var ul = panel.$.find('ul' + selector);
            var i = $(div).find('i');

            if (open) {
                ul.slideDown('fast', function () {
                    i.removeClass(down);
                    i.addClass(up);
                });
            }
            else {
                ul.slideUp('fast', function () {
                    i.removeClass(up);
                    i.addClass(down);
                });
            }
        }

    }



    panel.on('init', function () {

        panel.template(['item'], function (group, no) {

            return {
                data: {
                    'no': no,
                    'name': group.name,
                    'title-display': group.name ? '': 'display: none;',
                    'items-display': group.fold ? 'display: none;' : '',
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
            fold(this);
        });


        panel.$.on('mouseup', '[data-type="item"]', function (event) {
            var li = this;
            var index = +li.getAttribute('data-index');
            var no = +li.getAttribute('data-no');
            var id = no + '/' + index;

            var which = event.which;

            //按下鼠标左键或中键。
            if (which == 1 || which == 2) {
                //同时按下ctrl键或按下了鼠标中键，则打开新页面。
                var openNew = event.ctrlKey || which == 2;

                panel.fire('item', [id, openNew]);
            }
            


        });

    });


    panel.on('render', function (data) {
        list = data.groups;
        mutex = data.mutex;

        panel.fill(list);
        panel.fire('render');
    });



    return exports = panel.wrap({

        'active': function (id) {

            //取消激活。
            if (id === false) {
                panel.$.find('li.on').removeClass('on');
                return;
            }


            var args = id.split('/');
            var no = +args[0];
            var index = +args[1];

            var group = list[no];
            if (!group) {
                exports.active(false);
                panel.fire('404', 'group', [no]);
                return;
            }

            var item = group.items[index];
            if (!item) {
                exports.active(false);
                panel.fire('404', 'item', [no, index]);
                return;
            }

            var selector = $.String.format('li[data-index="{0}"][data-no="{1}"]', index, no);
            var li = panel.$.find(selector);

            panel.$.find('li.on').removeClass('on');

            li.addClass('on');

            li = li.get(0);
            li.scrollIntoViewIfNeeded();

            //展开相应的组。
            fold(no, true);

            panel.fire('active', [group, item]);
         
        },

        'setLeft': function (x) {
            panel.$.css('left', 60 - x + 'px');
        },
    });

});
