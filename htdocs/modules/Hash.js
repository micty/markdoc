
/**
* url 地址栏的 hash 工具模块
*/
define('/Hash', function (require, module, exports) {

   
    var KISP = require('KISP');
    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Url = MiniQuery.require('Url');

    var panel = KISP.create('Panel');



    panel.on('init', function () {

        Url.hashchange(window, function (hash, old) {

            if (!hash) { //针对后退时，退到无 hash 的状态
                panel.fire('none');
                return;
            }

            hash = $.Object.parseQueryString(hash);
            old = $.Object.parseQueryString(old);

            console.log(hash);


            //把基目录和文件名组合起来。
            var file = hash.file;
            var dir = hash.dir || '';

            var fileChanged =
                    file && file != old.file || 
                    dir && dir != old.dir;

            if (fileChanged) {

                var files = file.split(',').map(function (file) {
                    var index = file.lastIndexOf('.');
                    if (index < 0) {
                        file += '.md';
                    }

                    file = dir + file;

                    return file;
                });

                file = files.join(',');

                panel.fire('file', [file]);
            }


            if (hash.config && hash.config != old.config) {
                panel.fire('config', [hash.config]);
            }

            if (hash.item && hash.item != old.item) {
                panel.fire('item', [hash.item]);
            }


        }, true); //最后一个参数 true 表示一进入页面只要有 hash 就立即触发


        //针对首次进入时，无 hash 的状态
        var hash = Url.getHash(window, ''); //获取字符串形式
        if (!hash) {
            panel.fire('none');
        }

    });


    panel.on('render', function () {


    });



    return panel.wrap({
        'set': function (key, value) {

            var hash = Url.getHash(window) || {};

            if (typeof key == 'object') { //重载 set({ ... })，批量设置的情况
                $.Object.extend(hash, key);
            }
            else { //单个设置
                hash[key] = value;
            }

            //让 no 的优先级高于 md
            if (hash.md && hash.no) {
                delete hash.md;
            }

            Url.setHash(window, hash);

        },
    });

});





    