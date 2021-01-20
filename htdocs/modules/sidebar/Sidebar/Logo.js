
/**
* 
*/
KISP.panel('/Sidebar/Logo', function (require, module, panel) {
    const Url = require('Url');


    panel.on('init', function () {

       
    });


    panel.on('render', function (data) {
        if (data) {
            
            let ext = Url.extname(data);

            let logo = ext == 'png' || ext == 'jpg' ?
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





