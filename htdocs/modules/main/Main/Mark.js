
/**
*/
define('/Main/Mark', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
  

    var panel = KISP.create('Panel', '#div-main-mark');


    panel.on('init', function () {


    });


    panel.on('render', function () {

       
        
    });





    return panel.wrap({

        'set': function (y) {

            //ÐÐºÅ
            var no = (y - 4) / 20;
            no = Math.floor(no) + 1;

            var top = no * 20 + 20;

            panel.$.css({
                'top': top + 'px',
            });

            panel.show();
        },
    });



});
