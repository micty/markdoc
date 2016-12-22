
/**
* 
*/
define('/Header/Search', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var panel = KISP.create('Panel', '#div-header-search');



    panel.on('init', function () {

        var txt = panel.$.find('input').get(0);



        panel.$.on('focusin', txt, function () {
            panel.fire('focus');
        });

        panel.$.on('focusout', txt, function () {
            setTimeout(function () {
                panel.fire('blur');
            }, 100);
        });

        panel.$.on('keyup', txt, function (event) {
            if (event.keyCode == 13) {
                panel.fire('submit', [txt.value]);
            }
        });

        panel.$.on('click', 'button', function () {
            panel.fire('submit', [txt.value]);
        });
    });


    panel.on('render', function () {
       
    });


    return panel.wrap({

    });


});





