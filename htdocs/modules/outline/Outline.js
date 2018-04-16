

KISP.panel('/Outline', function (require, module, panel) {
    var KISP = require('KISP');
    var $String = KISP.require('String');
    var Outline = require('Outline');


    var outline = null;
    var visible = false;

    panel.set('show', false); //不要在 render 后自动显示。


    panel.on('init', function () {


        panel.$.on('scroll', 'ul', function (event) {
            event.stopPropagation();
            console.log(event);
        });

        outline = new Outline({
            'container': panel.$.find('>div'),
        });

        outline.on({
            'item': function (item, index) {
                panel.fire('item', [item, index]);
            },
        });

        outline.render();
    });



 
    /**
    * 渲染。
    *   items = [
    *       {
    *           text: '',       //
    *           level: 1,       //
    *       },
    *   ];
    */
    panel.on('render', function (items) {
        outline.fill(items);
    });




});
