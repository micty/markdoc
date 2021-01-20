
KISP.panel('/Sidebar/Groups', function (require, module, panel) {
    const Template = module.require('Template');


    let list = [];
    let mutex = false;

    //展开或折叠指定的组。
    //根据 mutex 字段控制是否使用互斥效果。
    function fold(no, needOpen) {
        if (typeof no == 'object') {
            no = +no.getAttribute('data-no');
        }

        let up = 'fa-angle-double-up';
        let down = 'fa-angle-double-down';
       

        //没有指定 needOpen，则自动判断。
        if (needOpen === undefined) {
            let $arrow = panel.$.find(`[data-id="arrow-${no}"]`);
            needOpen = $arrow.hasClass(down);
        }

        setStatus(no, needOpen);

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
                setStatus(index, !needOpen);
            }
        });


        //内部方法。
        function setStatus(no, open) {
            let group = list[no];
            let $icon = panel.$.find(`[data-id="icon-${no}"]`);
            let $arrow = panel.$.find(`[data-id="arrow-${no}"]`);
            let $group = panel.$.find(`[data-id="group-${no}"]`);

            let icon = group.icon;
            let icon2 = group.icon2;


            if (open) {
                if (icon2) {
                    $icon.removeClass(icon);
                    $icon.addClass(icon2);
                }

                $group.slideDown('fast', function () {
                    $arrow.removeClass(down);
                    $arrow.addClass(up);
                });
            }
            else {
                if (icon2) {
                    $icon.removeClass(icon2);
                    $icon.addClass(icon);
                }

                $group.slideUp('fast', function () {
                    $arrow.removeClass(up);
                    $arrow.addClass(down);
                });
            }
        }

    }



    panel.on('init', function () {
        let process = Template.get();

        panel.template(process);

       

        panel.$on('click', {
            '[data-type="group"]': function () {
                fold(this);
            },
        });

        panel.$on('mouseup', {
            '[data-type="item"]': function (event) {
                let li = this;
                let index = +li.getAttribute('data-index');
                let no = +li.getAttribute('data-no');
                let id = no + '/' + index;
                let which = event.which;

                //按下鼠标左键或中键。
                if (which == 1 || which == 2) {
                    //同时按下ctrl键或按下了鼠标中键，则打开新页面。
                    let openNew = event.ctrlKey || which == 2;

                    panel.fire('item', [id, openNew]);

                    if (which == 2) {
                        event.preventDefault();
                    }
                }


            },
        });


    });


    panel.on('render', function (data) {
        console.log(data);

        list = data.groups;
        mutex = data.mutex;

        panel.fill(data);
        panel.fire('render');
    });




    return {
        setLeft: function (x) {
            panel.$.css('left', 60 - x + 'px');
        },

        active: function (id) {

            //取消激活。
            if (id === false) {
                panel.$.find('li.on').removeClass('on');
                return;
            }


            let args = id.split('/');
            let no = +args[0];
            let index = +args[1];

            let group = list[no];
            if (!group) {
                module.exports.active(false);
                panel.fire('404', 'group', [no]);
                return;
            }

            let item = group.items[index];
            if (!item) {
                module.exports.active(false);
                panel.fire('404', 'item', [no, index]);
                return;
            }

            let selector = `li[data-no="${no}"][data-index="${index}"]`;
            let li = panel.$.find(selector);

            panel.$.find('li.on').removeClass('on');

            li.addClass('on');

            li = li.get(0);
            li.scrollIntoViewIfNeeded();

            //展开相应的组。
            fold(no, true);

            panel.fire('active', [group, item]);

        },

      
    };

});
