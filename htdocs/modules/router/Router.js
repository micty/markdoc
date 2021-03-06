﻿
/**
* 路由器模板。
*/
define.panel('/Router', function (require, module, panel) {
    const Query = require('@definejs/query');
    const Url = require('Url');
    const API = require('API');

    const Config = module.require('Config');
    const Hash = module.require('Hash');
    const File = module.require('File');


    let config = null;  //config.json 文件解析出来的对象。
    let defaults = module.data;


    panel.on('init', function () {

        function fireDefault(item) {
            let url = config.file;

            if (!url) {
                return;
            }

            let ext = Url.extname(url);

            if (ext == 'json') {
                panel.fire('sidebar', [url, item]);
            }
            else {
                panel.fire('file', [url]);
            }
        }

        //静态事件。
        API.on({
            404: function (url) {
                panel.fire('404', [url]);
            },
        });


        Config.on({
            'loading': function () {
                panel.fire('config', 'loading');
            },
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

            'plain': function (isPlain) {
                panel.fire('plain', [isPlain]);
            },
            'outline': function (isOutline) {
                panel.fire('outline', [isOutline]);
            },
            'sidebar': function (url, item) {
                url = File.normalize(url);
                panel.fire('sidebar', [url, item]);
            },

            'no-sidebar': function (item) {
                fireDefault(item);
            },

            'item': function (item) {
                panel.fire('item', [item]);
            },

            'file': function (url) {
                url = File.normalize(url);
                panel.fire('file', [url]);
            },
        });


    });


    /**
    * 
    */
    panel.on('render', function () {
        let qs = Query.get(window) || {};
        let url = defaults.url = qs.config || defaults.url;

        //记录 `config.json` 文件所在的目录，以它作为根目录。 
        //路径中以 `/` 开头的路径都是相对于根目录的，如 `/a/b/c.md`，则完整路径为 `data/a/b/c.md`。

        defaults.base = Url.dir(url); //以 '/' 结尾。
        File.init(defaults);


        //加载 config.json 文件。
        Config.get(url);

    });






    return {

        auto: function (file) {
            let isOrigin = file.startsWith('@');
            if (isOrigin) {
                file = file.slice(1);
            }

            //文件在基准目录里，删掉基准目录前缀，并且以 '/' 开头。
            if (file.startsWith(defaults.base)) {
                file = file.slice(defaults.base.length - 1);
            }

            if (isOrigin) {
                Hash.set('file', '@' + file);
                return
            }

            let ext = Url.extname(file);
            if (ext == 'json') {
                Hash.set('sidebar', file);
                return;
            }

            Hash.set('file', file);
        },


        set: function (hash) {
            Hash.setRelative(hash, defaults.base);
        },

        add: function (key, value, openNew) {
            Hash.add(key, value, openNew);
        },

        /**
        * 
        */
        normalize: function (url) {
            url = File.normalize(url);
            return url
        },

    };

});





    