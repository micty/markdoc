
KISP.panel('/Main/NotFound', function (require, module, panel) {

    var $ = require('$');
    var KISP = require('KISP');


 

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



});
