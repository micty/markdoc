
/**
* 
*/
define('/Sidebar/Logo', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var panel = KISP.create('Panel', '#div-sidebar-logo');



    panel.on('init', function () {

       
    });


    panel.on('render', function (data) {
        if (data) {
            panel.fill({
                'src': data,
            });
        }
    });


    return panel.wrap();


});





