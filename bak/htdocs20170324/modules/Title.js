
define('/Title', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');


    var KISP = require('KISP');
    var panel = KISP.create('Panel');
    
    var defaults = '';

    panel.on('render', function (data) {

        if (data == 404) {
            data = '404 Not Found';
        }


        defaults = defaults || data;

        var title = data || defaults;
        if (title) {
            title += ' - MarkDoc';
        }
        else {
            title = 'MarkDoc';
        }

        document.title = title;

    });


    return panel.wrap();
});
