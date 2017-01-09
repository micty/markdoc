
/**
* url 地址栏的 hash 工具模块
*/
define('/Router/Hash', function (require, module, exports) {

   
    var KISP = require('KISP');
    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var $Url = MiniQuery.require('Url');
    var Url = require('Url');

    var panel = KISP.create('Panel');
    var seperater = ':';


    //把 hash 字符串按字段优先级解析成一个对象。
    function parse(hash) {

        if (!hash) {
            return {};
        }

        if (hash.startsWith('#')) {
            hash = hash.slice(1);
        }

        if (hash.includes('=')) {
            return $.Object.parseQueryString(hash);
        }

        var list = hash.split(seperater);
        var url = list[0];
        if (!url) {
            return {};
        }

        var value = list[1];

        if (url.endsWith('/')) {
            return {
                'dir': url,
                'file': value,
            };
        }


        //file
        var isOrigin = url.startsWith('@');
        if (isOrigin) {
            return {
                'file': url,
            };
        }


        var ext = Url.extname(url);

        //sidebar
        if (ext == 'json') {
            return {
                'sidebar': url,
                'item': value,
            };
        }

        //item，如 `1/2`
        if ((/^\d+\/\d+$/).test(url)) {
            return {
                'item': url,
            };
        }

        //把第0组的组号省略。
        //item，如 `2`
        if ((/^\d+$/).test(url)) {
            return {
                'item': '0/' + url,
            };
        }
        
        //file
        return {
            'file': url,
        };


    }

    //把一个对象序列化成字符串，以用在 hash 中。
    function stringify(data) {

        var dir = data['dir'];
        var file = data['file'];

        if (dir) {
            return dir + seperater + file;
        }

        if (file) {
            return file;
        }


        var sidebar = data['sidebar'];
        var item = data['item'];

        //把第0组的组号省略。
        if (item && item.startsWith('0/')) {
            item = item.slice(2);
        }

        if (sidebar && item) {
            return sidebar + seperater + item;
        }

        return sidebar || item || '';
    }




    panel.on('init', function () {

        var fired = false;

        $Url.hashchange(window, function (hash, old) {

            panel.fire('change');

            if (!hash) { //针对后退时，退到无 hash 的状态
                panel.fire('none');
                return;
            }

            hash = parse(hash);
            old = parse(old);

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


            var sidebar = hash.sidebar;
            var item = hash.item;

            //把第0组的组号省略。
            if (item && !item.includes('/')) {
                item = '0/' + item;
            }


            if (sidebar) { //指定了 sidebar

                if (sidebar != old.sidebar) {   //切换了 sidebar。
                    panel.fire('sidebar', [sidebar, item]);
                }
                else {  // sidebar 未发生变化。
                    if (item && item != old.item) { //仅改变了 item。 
                        panel.fire('item', [item]);
                    }
                }
            }
            else {  //无 sidebar
           
                if (!fired && !file) { //首次触发，即在页面加载后第一次触发的。
                    panel.fire('no-sidebar', [item]);
                    fired = true;
                }
                else {
                    if (item && item != old.item) { //仅改变了 item。
                        panel.fire('item', [item]);
                    }
                }
            }


        }, true); //最后一个参数 true 表示一进入页面只要有 hash 就立即触发


        //针对首次进入时，无 hash 的状态
        var hash = $Url.getHash(window, ''); //获取字符串形式
        if (!hash) {
            panel.fire('none');
        }

    });


    panel.on('render', function () {


    });



    return panel.wrap({

        'add': function (key, value) {

            var hash = parse(location.hash);

            //重载 set({ ... })，批量设置的情况
            if (typeof key == 'object') { 
                $.Object.extend(hash, key);
            }
            else { //单个设置
                hash[key] = value;
            }

            hash = stringify(hash);
            location.hash = hash;
        },

        'set': function (key, value) {
            var hash = {};

            //set(hash) 字符串形式。
            if (arguments.length == 1) {
                key = key.slice(1); //去掉开头的 `#`
                key = decodeURIComponent(key);
                hash = parse(key);
            }
            else {
                hash[key] = value;
            }

            hash = stringify(hash);
            location.hash = hash;
        },

        'setRelative': function (hash, baseDir) {
            hash = hash.slice(1); //去掉开头的 `#`
            hash = decodeURIComponent(hash);
            hash = parse(hash);

           

            ['sidebar', 'file', 'dir'].forEach(function (key) {
                var file = hash[key];
                if (!file) {
                    return;
                }

                //文件在基准目录里，删掉基准目录前缀，并且以 '/' 开头。
                if (file.startsWith(baseDir)) {
                    hash[key] = file.slice(baseDir.length - 1);
                }
            });

            hash = stringify(hash);
            location.hash = hash;

        },
    });

});





    