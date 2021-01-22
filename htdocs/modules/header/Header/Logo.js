
/**
* 
*/
define.panel('/Header/Logo', function (require, module, panel) {


    panel.on('init', function () {

       
    });


    panel.on('render', function (data) {
        if (data) {
            //panel.$.find('img').attr('src', data);
            panel.fill({
                'src': data,
            });
        }
    });




});





