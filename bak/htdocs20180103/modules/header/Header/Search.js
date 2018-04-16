
/**
* 
*/
define('/Header/Search', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var panel = KISP.create('Panel', '#div-header-search', {
        showAfterRender: false,
    });



    panel.on('init', function () {

        var txt = panel.$.find('input').get(0);
        var submiting = false;


        panel.$.on('focusin', txt, function () {
            panel.fire('focus');
        });

        panel.$.on('focusout', txt, function () {
            if (submiting) {
                setTimeout(function () {
                    panel.fire('blur');
                }, 400);
            }
            else {
                panel.fire('blur');
            }
        });

        panel.$.on('keyup', txt, function (event) {
            if (event.keyCode == 13) {
                panel.fire('submit', [txt.value]);
            }
        });

        panel.$.on('click', 'button', function () {
            panel.fire('submit', [txt.value]);
        });

        panel.$.on('mouseover', 'button', function () {
            submiting = true;
        });

        panel.$.on('mouseleave', 'button', function () {
            submiting = false;
        });
     
    });


    panel.on('render', function (data) {
        console.log(data);
        if (!data) {
            panel.hide();
        }
        else {
            panel.show();
        }
    });


    return panel.wrap({

    });


});





