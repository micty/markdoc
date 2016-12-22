
define('/Main/NotFound', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');


    var panel = KISP.create('Panel', '#div-main-notfound');
 

    panel.on('init', function () {

  
    });


    panel.on('render', function (data) {
        panel.fill({
            'file': data,
        });

    });



    return panel.wrap();

});
