
KISP.panel('/Footer/Menus', function (require, module, panel) {

    var $ = require('$');
    var KISP = require('KISP');


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





});
