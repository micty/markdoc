
/**
* 
*/
KISP.panel('/Router', function (require, module, panel) {
    var KISP = require('KISP');
    var $ = require('$');
    var Query = KISP.require('Query');
    var Url = require('Url');
    var API = require('API');

    var Config = module.require('Config');
    var Hash = module.require('Hash');

    var config = null;
    var baseDir = '';       // config.json 文件所在的目录，以此为基准目录。


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
                if (url.startsWith('/')) {
                    url = baseDir + url.slice(1);
                }

                panel.fire('sidebar', [url, item]);
            },

            'no-sidebar': function (item) {
                fireDefault(item);
            },

            'item': function (item) {
                panel.fire('item', [item]);
            },

            'file': function (url) {
                var files = url.split(',');

                files = files.map(function (file) {
                    
                    var isOrigin = file.startsWith('@');
                    if (isOrigin) {
                        file = file.slice(1);
                    }


                    if (file.startsWith('/')) {
                        file = baseDir + file.slice(1);
                    }

                    if (isOrigin) {
                        file = '@' + file;
                    }

                    return file;
                });

                url = files.join(',');

                panel.fire('file', [url]);
            },
        });


    });


    var configUrl = null;

    panel.on('render', function () {
     
        var qs = Query.get(window) || {};
        var url = configUrl = qs.config || 'data/config.json';

        baseDir = Url.dir(url); //以 '/' 结尾。

        panel.fire('config', 'loading');
        Config.get(url);


    });



    return {

        'auto': function (file) {

            var isOrigin = file.startsWith('@');
            if (isOrigin) {
                file = file.slice(1);
            }

            //文件在基准目录里，删掉基准目录前缀，并且以 '/' 开头。
            if (file.startsWith(baseDir)) {
                file = file.slice(baseDir.length - 1);
            }

            if (isOrigin) {
                Hash.set('file', '@' + file);
                return
            }

            var ext = Url.extname(file);
            if (ext == 'json') {
                Hash.set('sidebar', file);
                return;
            }

            Hash.set('file', file);
        },


        'set': function (hash) {
            Hash.setRelative(hash, baseDir);
        },

        'add': function (key, value, openNew) {
            Hash.add(key, value, openNew);
        },

    };

});





    