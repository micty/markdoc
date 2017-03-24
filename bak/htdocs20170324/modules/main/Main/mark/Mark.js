
/**
*/
define('/Main/Mark', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
  

    var panel = KISP.create('Panel', '#div-main-mark', {
        showAfterRender: false,
    });
    

    var type$fn = {
        'number': function (y, fadeIn) {
          
            //�к�
            var no = (y - 4) / 20;
            no = Math.floor(no) + 1;

           

            var top = no * 20 + 20;

            if (fadeIn) {
                top += 12;
            }

            if (no < 1 || top < 0) {
                top = -1000; //����� Header �ص���
            }

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
            type$fn['number'](-40);             //Ϊ���� isCode ʱ�ڳ�ʼʱ����ʾ��ǰ�У�ֻ�е�������ʾ��
            type$fn['boolean'](data.isCode);
        },
    };



    panel.on('init', function () {


    });


    panel.on('render', function (data, fadeIn) {
        type$fn[typeof data](data, fadeIn);
    });


    return panel.wrap();


});
