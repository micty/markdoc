
/**
* url 地址栏的 hash 工具模块
*/
KISP.panel('/Router/Hash', function (require, module, panel) {
    var KISP = require('KISP');
    var $ = require('$');
    var Hash = KISP.require('Hash');
    var Parser = module.require('Parser');


    panel.on('init', function () {

        var fired = false;

        Hash.onchange(window, function (hash, old) {

            panel.fire('change');

            if (!hash) { //针对后退时，退到无 hash 的状态
                panel.fire('none');
                return;
            }

            hash = Parser.parse(hash);
            old = Parser.parse(old);


            //把基目录和文件名组合起来。
            var file = hash.file || '';
            var dir = hash.dir || '';

            var fileChanged =
                    file && file != old.file || 
                    dir && dir != old.dir;

            if (fileChanged) {

                var files = file.split(',').map(function (file) {
                    if (!file) {
                        return dir + 'index.md'; //默认是 index.md
                    }

                    if (file.endsWith('/')) {
                        file = file + 'index.md';
                    }

                    var index = file.lastIndexOf('.');

                    if (index < 0) { //不含有后缀名
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

            //把第 0 组的组号省略。
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
        var hash = Hash.get(window, ''); //获取字符串形式
        if (!hash) {
            panel.fire('none');
        }

    });


    panel.on('render', function () {


    });



    return {

        'add': function (key, value, openNew) {
            var hash = Parser.parse(location.hash);

            //重载 set({ ... })，批量设置的情况
            if (typeof key == 'object') {
                Object.assign(hash, key);
            }
            else { //单个设置
                hash[key] = value;
            }

            hash = Parser.stringify(hash);

            if (openNew) {
                var url = location.origin + location.pathname + '#' + hash;
                window.open(url);
            }
            else {
                location.hash = hash;
            }

        },

        'set': function (key, value) {
            var hash = {};

            //set(hash) 字符串形式。
            if (arguments.length == 1) {
                key = key.slice(1); //去掉开头的 `#`
                key = decodeURIComponent(key);
                hash = Parser.parse(key);
            }
            else {
                hash[key] = value;
            }

            hash = Parser.stringify(hash);
            location.hash = hash;
        },

        'setRelative': function (hash, baseDir) {
            hash = hash.slice(1); //去掉开头的 `#`
            hash = decodeURIComponent(hash);
            hash = Parser.parse(hash);



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

            hash = Parser.stringify(hash);
            location.hash = hash;

        },
    };

});





    