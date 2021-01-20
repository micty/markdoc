
/**
* 
*/
KISP.panel('/Iframe', function (require, module, panel) {
    const $ = require('$');

    panel.on('init', function () {


        $(window).on('resize', function () {
            let height = window.innerHeight - 21

            panel.$.find('iframe').css({
                'height': height,
            });
        });
    });


    panel.on('render', function (opt) {
        let height = window.innerHeight - 21;

        panel.fill({
            'url': opt.url,
            'height': height,
        });

        document.title = opt.name;

    });


    //隐藏时清空内容，以释放资源。
    panel.on('hide', function () {
        panel.$.html('');
    });


    return {

    };


});





