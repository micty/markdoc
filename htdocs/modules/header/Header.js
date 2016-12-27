
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

    var panel = KISP.create('Panel', '#div-panel-header');
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
        current = data;
        Search.render(data.search);
        Groups.render(data.menus);
        Logo.render(data.logo);
    });





    return panel.wrap({

        fixed: function (sw) {
            if (!sw) {
                panel.$.removeClass('fixed');
                return;
            }

            var fixed = current.fixed !== false;    //配置是否明确禁用 fixed
            if (fixed) {
                panel.$.addClass('fixed');
            }
        },

        leave: function (sw) {
            panel.$.toggleClass('leave', sw);
        },

        reset: function () {
            panel.$.removeClass('leave fixed');
        },
        

    });


});





