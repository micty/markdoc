
/**
* 
*/
define('/Router', function (require, module, exports) {

   
    var KISP = require('KISP');
    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Url = require('Url');
    var API = require('API');

    var Config = module.require('Config');
    var Hash = module.require('Hash');

    var panel = KISP.create('Panel');
    var config = null;


    panel.on('init', function () {
        

        function fireDefault(item) {
            var url = config.file;
            if (!url) {
                return;
            }

            var ext = Url.extname(url);

            if (ext == 'json') {
                panel.fire('sidebar', [url, item]);
            }
            else {
                panel.fire('file', [url]);
            }
        }


        API.on({
            404: function (url) {
                panel.fire('404', [url]);
            },
        });

        Config.on({
            'success': function (data) {
               
                config = data;
                panel.fire('config', 'success', [data]);

                Hash.render();
            },
        });


        Hash.on({
            'change': function () {
                panel.fire('change');
            },

            'none': function () {
                fireDefault();
            },

            'sidebar': function (url, item) {
                panel.fire('sidebar', [url, item]);
            },

            'no-sidebar': function (item) {
                fireDefault(item);
            },

            'item': function (item) {
                panel.fire('item', [item]);
            },

            'file': function (url) {
                panel.fire('file', [url]);
            },
        });


    });


    panel.on('render', function () {
        var Url = MiniQuery.require('Url');
        var qs = Url.getQueryString(window) || {};
        var url = qs.config || 'data/config.json';

        panel.fire('config', 'loading');
        Config.get(url);


    });



    return panel.wrap({

        'auto': function (file) {
            var ext = Url.extname(file);
            
            if (ext == 'json') {
                Hash.set('sidebar', file);
                return;
            }

            Hash.set('file', file);


        },

        'set': Hash.set,
        'add': Hash.add,
    });

});





    