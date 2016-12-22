
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
        Search.render();
        Groups.render(data.menus);
        Logo.render(data.logo);
    });





    return panel.wrap({
        
        'addClass': function (name) {
            panel.$.addClass(name);
        },

        'removeClass': function (name) {
            panel.$.removeClass(name);
        },

        

    });


});





