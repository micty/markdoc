
/**
*/
KISP.panel('/Main/Mark', function (require, module, panel) {

    var $ = require('$');
    var exports = null;

    var current = {
        no: 0,
        y: 0,
        top: -1000,
        fadeIn: false,
        maxNo: 0, //����кš�
    };


    panel.set('show', false);


    panel.on('init', function () {
        $(document.body).on('keydown', function (event) {
            var keyCode = event.keyCode;
            var isUp = keyCode == 38;
            var isDown = keyCode == 40;
            var isUpDown = isUp || isDown;

            if (!isUpDown || current.top < 0) {
                return;
            }
           

          

            var y = current.y;
            var fadeIn = current.fadeIn;
            var no = current.no;

            if (isUp) {
                if (no <= 1) {
                    return;
                }

                y = y - 20;
            }
            else if (isDown) {
                var length = $('.line-numbers').find('>li').length;

                if (no >= length) {
                    return;
                }

                y = y + 20;
            }


            event.preventDefault();
            exports.highlight(y, fadeIn);
            panel.$.get(0).scrollIntoViewIfNeeded();
        });

    });


    panel.on('render', function (isCode) {
        exports.highlight(-40); //Ϊ���� isCode ʱ�ڳ�ʼʱ����ʾ��ǰ�У�ֻ�е�������ʾ��
        panel.toggle(isCode);
     

    });



    return exports = {

        /**
        * ���������λ�õ����� y ֵ�������Ӧ�ø������С�
        */
        highlight: function (y, fadeIn) {
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


            Object.assign(current, {
                'no': no,
                'y': y,
                'fadeIn': fadeIn,
                'top': top,
            });

            panel.$.css({
                'top': top + 'px',
            });
        },
    };
});
