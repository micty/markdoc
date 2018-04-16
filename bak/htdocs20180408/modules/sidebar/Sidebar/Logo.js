
/**
* 
*/
KISP.panel('/Sidebar/Logo', function (require, module, panel) {

    var $ = require('$');
    var KISP = require('KISP');
    var Url = require('Url');


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


    return {
        'setLeft': function (x) {
            panel.$.css('left', 70 - x + 'px');
        },
    };


});





