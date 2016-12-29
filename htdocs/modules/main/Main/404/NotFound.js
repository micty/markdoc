
define('/Main/NotFound', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');


    var panel = KISP.create('Panel', '#div-main-notfound');
 

    panel.on('init', function () {

  
    });


    panel.on('render', function (file, data) {

        var isItem = 'index' in data;
        var isGroup = 'no' in data;

        panel.fill({
            'file': file,
            'no': data.no,
            'index': data.index,

            'group-display': (isItem || !isGroup) ? 'display: none;' : '',
            'item-display': isItem ? '' : 'display: none;',
        });

    });



    return panel.wrap();

});
