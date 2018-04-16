
KISP.panel('/Footer/Copyright', function (require, module, panel) {

    var $ = require('$');
    var KISP = require('KISP');




    panel.on('init', function () {

       
    });



    panel.on('render', function (data) {

        panel.fill({
            'copyright': data,
        });
       
    });






});
