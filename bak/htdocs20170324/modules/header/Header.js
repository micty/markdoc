
/**
* 
*/
define('/Header', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var Groups = module.require('Groups');
    var Logo = module.require('Logo');
    var Search = module.require('Search');

    var panel = KISP.create('Panel', '#div-panel-header', {
        showAfterRender: false,
    });
    var current = null;


    panel.on('init', function () {

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
                var file = group.file;
                file && panel.fire('menu', [file]);
            },

            'item': function (item) {
                var file = item.file;
                file && panel.fire('menu', [file]);
            },
        });

    });


    panel.on('render', function (data) {
       
        if (!data || data.disabled) {
            panel.hide();
            panel.fire('visible', [false]);
            return;
        }


        current = data;
        Search.render(data.search);
        Groups.render(data.menus);
        Logo.render(data.logo);
        panel.show();
        panel.fire('visible', [true]);

    });


    


    return panel.wrap({

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

            var fixed = current.fixed !== false;    //配置是否明确禁用 fixed
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
        
        'setLeft': function (x) {
            if (panel.$.hasClass('fixed')) {
                panel.$.css('left', 0 - x + 'px');
            }
        },
    });


});





