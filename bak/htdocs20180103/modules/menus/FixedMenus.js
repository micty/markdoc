
/**
* 右侧固定菜单栏模块
*/
define('/FixedMenus', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var panel = KISP.create('Panel', '#ul-fixed-menus');

    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function () {
            var li = this;
            var cmd = li.getAttribute('data-cmd');

            switch (cmd) {

                case 'top':
                    scrollTo(0, 0);
                    break;

                case 'home':
                    location.hash = '#';
                    break;

                case 'outline':
                case 'print':
                    panel.fire(cmd);
                    break;

                case 'bottom':
                    scrollTo(0, document.body.scrollHeight);
                    break;
            }
        });

    });


    panel.on('render', function (isCode) {
        panel.$.find('[data-cmd="outline"]').toggle(!isCode);
    });



    return panel.wrap();
});





    