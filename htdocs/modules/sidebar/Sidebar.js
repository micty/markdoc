
/**
* 侧边菜单栏模块
*/
define('/Sidebar', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');

    var API = module.require('API');
    var Groups = module.require('Groups');
    var Logo = module.require('Logo');

    var panel = KISP.create('Panel', '#div-panel-sidebar', {
        showAfterRender: false,
    });

    var current = {
        data: null,
        item: null,
        logo: '',
        ready: false,
    };

    panel.on('init', function () {

        API.on({
            'success': function (data) {
                panel.show();

                current.data = data;

                var logo = data.logo || current.logo;
                Logo.render(logo);

                Groups.render(data);
            },
        });


        Groups.on({
            'item': function (id) {
                panel.fire('item', [id]);
            },

            'active': function (group, item) {
                panel.fire('active', [item.file]);
            },
            'render': function () {
                current.ready = true;

                var item = current.item;
                var url = current.data.file;

                if (item) {
                    Groups.active(item);
                }
                else if (url) {
                    panel.fire('active', [url]);
                }
            },
        });
      
    });



    panel.on('render', function (url, item) {
        
        panel.hide();
        current.item = item;
        API.get(url);
      
    });




    return panel.wrap({
        'active': function (item) {

            if (!item) {
                var data = current.data;
                var url = data.file;
                if (!url) {
                    return;
                }

                Groups.active(false);
                panel.fire('active', [url]);
                return;
            }


            if (current.ready) {
                Groups.active(item);
                return;
            }

            Groups.on('render', function () {
                Groups.active(item);
            });
           
        },

        'addClass': function (name) {
            panel.$.addClass(name);
        },

        'removeClass': function (name) {
            panel.$.removeClass(name);
        },

        //设置备用 logo
        'logo': function (url) {
            current.logo = url;
        },
    });

});





