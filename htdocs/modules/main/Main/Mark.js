
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
            //�к�
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
            type$fn['number'](-20);             //Ϊ���� isCode ʱ�ڳ�ʼʱ����ʾ��ǰ�У�ֻ�е�������ʾ��
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
