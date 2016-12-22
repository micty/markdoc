
define('/Footer/Menus', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');


    var panel = KISP.create('Panel', '#ul-main-footer-menus');
    var list = [];

    panel.on('init', function () {

        panel.$.on('click', 'li[data-index]', function () {
            var li = this;
            var index = +li.getAttribute('data-index');
            var item = list[index];

            panel.fire('file', [item.file]);

        });
    });



    panel.on('render', function (data) {

        list = data;
        panel.fill(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });
       
    });



    return panel.wrap();



});
