
define('/Main/Header', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');


    var panel = KISP.create('Panel', '#div-main-header', {
        showAfterRender: false,
    });


    panel.on('init', function () {

        panel.$.on('click', function () {
            panel.fire('click');
        });
    });

    panel.on('render', function (data) {

        if (!data.isCode) {
            panel.hide();
            return;
        }

        panel.fill({
            'url': data.url,
            'name': data.name,
        });

        panel.show();
       
    });



    return panel.wrap();



});
