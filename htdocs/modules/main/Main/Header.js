
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
            console.log(cmd, chk.checked);
            panel.fire(cmd, [chk.checked]);
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



    return panel.wrap();



});
