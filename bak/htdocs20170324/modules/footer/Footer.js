
define('/Footer', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var Copyright = module.require('Copyright');
    var Logos = module.require('Logos');
    var Menus = module.require('Menus');

    var panel = KISP.create('Panel');


    panel.on('init', function () {

        Menus.on({
            'file': function (file) {
                panel.fire('file', [file]);
            },
        });

        Logos.on({
            'file': function (file) {
                panel.fire('file', [file]);
            },
        });
    });



    panel.on('render', function (data) {
        Copyright.render(data.copyright);
        Logos.render(data.logos);
        Menus.render(data.menus);
       
    });



    return panel.wrap();



});
