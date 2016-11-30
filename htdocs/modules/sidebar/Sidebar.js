
/**
* 侧边菜单栏模块
*/
define('/Sidebar', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');


    var Groups = module.require('Groups');
    var Scroller = module.require('Scroller');

    var panel = KISP.create('Panel', '#div-panel-sidebar');
    var current = null;
    var isReady = false;


    panel.on('init', function () {

        Groups.on({
            'item': function (id) {
                panel.fire('item', [id]);
            },

            'active': function (group, item) {
                panel.fire('active', [group, item]);
            },
        });
    });


    panel.on('render', function (data) {
        Groups.render(data.groups);
        Scroller.render();
        isReady = true;
    });




    return panel.wrap({
        'active': function (id) {
            if (isReady) {
                Groups.active(id);
                return;
            }

            panel.on('render', function () {
                Groups.active(id);
            });
        },
    });

});





