
/**
*/
define('/Main/Mark', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
  

    var panel = KISP.create('Panel', '#div-main-mark', {
        showAfterRender: false,
    });
    

    var type$fn = {
        'number': function (y) {
            //行号
            var no = (y - 4) / 20;
            no = Math.floor(no) + 1;

            var top = no * 20 + 20;

            panel.$.css({
                'top': top + 'px',
            });
        },

        'boolean': function (checked) {
            if (checked) {
                panel.show();
            }
            else {
                panel.hide();
            }
        },

        'object': function (data) {
            type$fn['number'](-20);             //为了让 isCode 时在初始时不显示当前行，只有点击后才显示。
            type$fn['boolean'](data.isCode);
        },
    };



    panel.on('init', function () {


    });


    panel.on('render', function (data) {
        type$fn[typeof data](data);
    });


    return panel.wrap();


});
