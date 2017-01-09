
/**
* 
*/
define('/Sidebar/Logo', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var Url = require('Url');
    var panel = KISP.create('Panel', '#div-sidebar-logo');


    panel.on('init', function () {

       
    });


    panel.on('render', function (data) {
        if (data) {
            
            var ext = Url.extname(data);

            var logo = ext == 'png' || ext == 'jpg' ?
                '<img src="' + data + '" />' :
                '<span>' + data + '</span>'

            panel.fill({
                'logo': logo,
            });
        }
    });


    return panel.wrap({
        'setLeft': function (x) {
            panel.$.css('left', 70 - x + 'px');
        },
    });


});





