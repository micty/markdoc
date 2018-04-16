
/**
* url 地址栏的 hash 工具模块
*/
KISP.panel('/Router/Hash/Parser', function (require, module, panel) {
    var KISP = require('KISP');
    var $ = require('$');
    var Query = KISP.require('Query');
    var Url = require('Url');

    var seperater = ':';




    return {

        //把 hash 字符串按字段优先级解析成一个对象。
        parse: function (hash) {
            if (!hash) {
                return {};
            }

            if (hash.startsWith('#')) {
                hash = hash.slice(1);
            }

            if (hash.includes('=')) {
                hash = Query.parse(hash);
                return hash;
            }


            //解析如 `/a/b/c:0,1,2,3` 这样的格式。
            //以分隔符 `:` 为分界，`/a/b/c` 是目录名部分，`0,1,2,3` 是文件名部分
            var list = hash.split(seperater);
            var url = list[0];
            var value = list[1];

            if (!url) {
                return {};
            }

            if (url.endsWith('/')) {
                return {
                    'dir': url,
                    'file': value,
                };
            }


            //file
            //如 `@/es6/sidebar.json`，显示源文件。
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

            //把第 0 组的组号省略。
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


        },


        //把一个对象序列化成字符串，以用在 hash 中。
        stringify: function (data) {
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
        },
    };

});





    