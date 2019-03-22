
/**
* url 地址栏的 hash 工具模块。
*/
KISP.panel('/Router/Hash', function (require, module, panel) {
    var KISP = require('KISP');
    var $ = require('$');
    var Hash = KISP.require('Hash');
    var Parser = module.require('Parser');
    var File = module.require('File');


    panel.on('init', function () {
        var fired = false;


        //第一个参数 true 表示一进入页面只要有 hash 就立即触发
        Hash.onchange(window, true, function (hash, old) {

            panel.fire('change');

            //针对后退时，退到无 hash 的状态
            if (!hash) {
                panel.fire('plain', [false]); //这里要触发一下，以便恢复之前可能被隐藏的 header、footer 等。
                panel.fire('none');
                return;
            }


            hash = Parser.parse(hash);  //当前的 hash 对象。
            old = Parser.parse(old);    //之前的 hash 对象。

            panel.fire('plain', [hash.isPlain]);
            panel.fire('outline', [hash.isOutline]);

           
            var file = File.normalize(hash, old);

            //显示单个文件。
            if (file) {
                panel.fire('file', [file]);
                return;
            }


            var sidebar = hash.sidebar;
            var item = hash.item;


            //把第 0 组的组号省略了，补回来。
            //如 `/es6/sidebar.json:5`，则当成是第 0 组的第 5 项。
            if (item && !item.includes('/')) {
                item = '0/' + item;
            }

            //指定了 sidebar。
            if (sidebar) { 
                //切换了 sidebar。
                if (sidebar != old.sidebar) {   
                    panel.fire('sidebar', [sidebar, item]);
                    return;
                }

                //sidebar 未发生变化，仅改变了 item。 
                if (item && item != old.item) {
                    panel.fire('item', [item]);
                }
                else {
                    panel.fire('sidebar', [sidebar, item]);
                }
                return

            }
           

            //没有指定 sidebar。
            //主要针对在 config.json 的 file 字段指定为一个 sidebar.json 文件的情况。
            //此时，不需要通过 hash 来指定 sidebar 文件，而是根据 config.json 文件来读取。
            //因此，sidebar 文件只需要读取一次，后续的 hash 变化了就触发 item 事件即可。
            if (!fired) { //首次触发，即在页面加载后第一次触发的。
                panel.fire('no-sidebar', [item]);
                fired = true;
            }
            else {
                if (item && item != old.item) { //仅改变了 item。
                    panel.fire('item', [item]);
                }
            }

        }); 




    });


    panel.on('render', function () {


        //针对首次进入时，无 hash 的状态
        var hash = Hash.get(window, ''); //获取字符串形式

        if (!hash) {
            panel.fire('none');
        }
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





    