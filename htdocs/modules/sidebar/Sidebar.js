
/**
* 侧边菜单栏。
*/
KISP.panel('/Sidebar', function (require, module, panel) {
    var $ = require('$');
    var KISP = require('KISP');

    var API = module.require('API');
    var Groups = module.require('Groups');
    var Logo = module.require('Logo');


    var meta = {
        data: null,
        item: null,
        logo: '',       //备用 logo。
        ready: false,
        url: '',
    };


    panel.set('show', false);


    panel.on('init', function () {

        API.on({
            'success': function (data) {
                var fixed = data.fixed !== false;   //配置是否明确禁用 fixed。 默认是启用 fixed 的。   
                var logo = data.logo || meta.logo;  //logo 图标。

                meta.data = data;

                panel.$.toggleClass('fixed', fixed);
                Logo.render(logo);
                Groups.render(data);

                panel.show();
            },
        });


        Groups.on({
            'item': function (id, openNew) {
                panel.fire('item', [id, openNew]);
            },

            'active': function (group, item) {
                panel.fire('active', [item.file]);
            },

            'render': function () {
                meta.ready = true;

                var item = meta.item;
                if (item) {
                    Groups.active(item);
                    return;
                }

                var url = meta.data.file;
                if (url) {
                    panel.fire('active', [url]);
                    return;
                }

                Groups.active('0/0');
            },

            404: {
                'group': function (no) {
                    panel.fire('404', [meta.url, {
                        'no': no,
                        'sidebar': true,
                    }]);
                },
                'item': function (no, index) {
                    panel.fire('404', [meta.url, {
                        'no': no,
                        'index': index,
                        'sidebar': true,
                    }]);
                },
            },
        });
      
    });


    /**
    * 加载和渲染侧边栏。
    *   url: '',    //必选，sidebar.json 配置文件的 url。
    *   item: '',   //可选，渲染完成后要激活的菜单项。 如 `1/3`，表示第 1 组的第 3 项。
    */
    panel.on('render', function (url, item) {
        panel.hide();

        meta.url = url;     
        meta.item = item;

        API.get(url);
      
    });


    return panel.wrap({
        'active': function (item) {
            panel.show();

            if (!item) {
                var data = meta.data;
                var url = data.file;
                if (!url) {
                    return;
                }

                Groups.active(false);
                panel.fire('active', [url]);
                return;
            }


            if (meta.ready) {
                Groups.active(item);
                return;
            }

            Groups.on('render', function () {
                Groups.active(item);
            });
           
        },

        //设置备用 logo
        'logo': function (data) {
            if (!data) {
                return;
            }

            var url = typeof data == 'object' ? data.logo : data;

            meta.logo = url;
        },

        'setLeft': function (x) {
            Logo.setLeft(x);
            Groups.setLeft(x);
        },
    });

});





