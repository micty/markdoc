
/**
* 
*/
KISP.panel('/Header', function (require, module, panel) {
    const Groups = module.require('Groups');
    const Logo = module.require('Logo');
    const Search = module.require('Search');

    let current = null;




    panel.set('show', false); //禁止 render 后自动显示。

    panel.on('init', function () {

        function fireMenu(opt) {
            

            if (opt.file) {
                panel.fire('file', [opt.file]);
                return;
            }

            if (opt.url) {
                if (opt.target == 'iframe') {
                    panel.fire('iframe', [opt]);
                }
                else {
                    panel.fire('url', [opt]);
                }
                return;
            }

        }


        Search.on({
            'focus': function () {
                panel.$.addClass('focus');
            },

            'blur': function () {
                panel.$.removeClass('focus');
            },
            'submit': function (value) {
                panel.fire('search', [value]);
            },
        });

        Groups.on({
            'group': function (group) {
                fireMenu(group);
            },

            'item': function (item) {
                fireMenu(item);
            },
        });

    });


    panel.on('render', function (data) {

        //无数据，则禁用
        if (!data) {
            panel.hide();
            panel.fire('visible', [false]);
            return;
        }

        //启用。
        current = data;
        Search.render(data.search);
        Groups.render(data.menus);
        Logo.render(data.logo);

        panel.show();
        panel.fire('visible', [true]);

    });


    


    return {

        fixed: function (sw) {

            //给禁用了
            if (!current) {
                return;
            }

            if (!sw) {
                if (panel.$.hasClass('fixed')) {
                    panel.$.addClass('slide-up');
                }
                return;
            }

            let fixed = current.fixed !== false;    //配置是否明确禁用 fixed
            if (fixed) {
                panel.$.addClass('fixed');
                panel.$.removeClass('slide-up');

            }
        },

        leave: function (sw) {
            panel.$.toggleClass('leave', sw);
        },

        reset: function () {
            panel.$.removeClass('leave fixed slide-up');
        },

        setLeft: function (x) {
            if (panel.$.hasClass('fixed')) {
                panel.$.css('left', 0 - x + 'px');
            }
        },
    };


});





