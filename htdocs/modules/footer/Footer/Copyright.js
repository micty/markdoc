
define('/Footer/Copyright', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');


    var panel = KISP.create('Panel', '#div-main-footer-copyright');


    panel.on('init', function () {

       
    });



    panel.on('render', function (data) {

        panel.fill({
            'copyright': data,
        });
       
    });



    return panel.wrap();



});
