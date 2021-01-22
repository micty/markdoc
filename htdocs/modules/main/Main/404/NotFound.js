
define.panel('/Main/NotFound', function (require, module, panel) {

    panel.on('init', function () {

  
    });


    /**
    *   data = {
    *       no: 0,      //可选。 菜单栏 sidebar 的组号。
    *       index 0,    //可选。 菜单栏 sidebar 某组内的索引号。
    *   };
    */
    panel.on('render', function (file, data) {

        let isItem = 'index' in data;
        let isGroup = 'no' in data;

        panel.fill({
            'file': file,
            'no': data.no,
            'index': data.index,

            'group-display': (isItem || !isGroup) ? 'display: none;' : '',
            'item-display': isItem ? '' : 'display: none;',
        });

    });



});
