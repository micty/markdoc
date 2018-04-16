
/**
* 侧边菜单栏模块
*/
KISP.panel('/Sidebar', function (require, module, panel) {
    var $ = require('$');
    var KISP = require('KISP');

    var API = module.require('API');
    var Groups = module.require('Groups');
    var Logo = module.require('Logo');


    var current = {
        data: null,
        item: null,
        logo: '',
        ready: false,
        url: '',
    };


    panel.set('show', false);


    panel.on('init', function () {

        API.on({
            'success': function (data) {
               

                current.data = data;
                panel.show();

                var fixed = data.fixed !== false;       //配置是否明确禁用 fixed
                panel.$.toggleClass('fixed', fixed);

                var logo = data.logo || current.logo;
                Logo.render(logo);

                Groups.render(data);
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
          
                current.ready = true;

                var item = current.item;
                if (item) {
                    Groups.active(item);
                    return;
                }

                var url = current.data.file;
                if (url) {
                    panel.fire('active', [url]);
                    return;
                }

                Groups.active('0/0');
            },
            404: {
                'group': function (no) {
                    panel.fire('404', [current.url, {
                        'no': no,
                        'visible': true,
                    }]);
                },
                'item': function (no, index) {
                    panel.fire('404', [current.url, {
                        'no': no,
                        'index': index,
                        'visible': true,
                    }]);
                },
            },
        });
      
    });



    panel.on('render', function (url, item) {
        
        panel.hide();
        current.item = item;
        current.url = url;

        API.get(url);
      
    });


    return panel.wrap({
        'active': function (item) {
            panel.show();

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

        //设置备用 logo
        'logo': function (data) {
            if (!data) {
                return;
            }

            var url = typeof data == 'object' ? data.logo : data;
            current.logo = url;
        },

        'setLeft': function (x) {
            Logo.setLeft(x);
            Groups.setLeft(x);
        },
    });

});





