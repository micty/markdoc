
define('/Main/Header', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');


    var panel = KISP.create('Panel', '#div-main-header', {
        showAfterRender: false,
    });


    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function () {
            var chk = this;
            var cmd = chk.getAttribute('data-cmd');
            var checked = chk.checked;

            //在源代码比较多时，选中的动画会比较卡。
            //先让动画完成，再执行其它业务可避免此问题。
            if (checked) {
                setTimeout(function () {
                    panel.fire(cmd, [checked]);
                }, 200);
            }
            else {
                panel.fire(cmd, [checked]);
            }
            
        });

    });

    panel.on('render', function (data) {

        if (!data.isCode) {
            panel.hide();
            return;
        }

        panel.fill({
            'url': data.url,
            'name': data.name,
            'chk-numbers-id': $.String.random(),
            'chk-comment-id': $.String.random(),
            'chk-empty-id': $.String.random(),
            'chk-mark-id': $.String.random(),
        });

        panel.show();
       
    });



    return panel.wrap({
        'leave': function (sw) {
            panel.$.toggleClass('fixed', sw);
        },
    });



});
