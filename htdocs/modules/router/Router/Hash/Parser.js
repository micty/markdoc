
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

        /**
        * 把 hash 字符串按字段优先级解析成一个对象。
        * 示例情况:
        *   `a=1&b=2`
        *   `/a/b/c/:0,1,2,3`
        *   `@/es6/sidebar.json`
        *   `/app/vGuide/sidebar.json:2/1`
        *   `/article/API.md`
        *   `!/article/API.md`
        *
        * 如果 hash 中以 `#` 开头，则截取后面的部分进行解析。
        * 如果 hash 中含有 `=`，则当成 query 进行解析。
        * 如果 hash 中以 `!` 开头，则当成简明模式来显示，即隐藏 header、footer等，只显示内容区。
        * 如果 hash 中以 `~` 开头，则显示提纲栏。
        * 如果 hash 中以 `~!` 或 `!~`开头，则当成显示提纲栏和简明模式。
        * 如果 hash 中含有 `/:`，则当成 `dir:files` 的格式进行解析，
        *   如 `/a/b/c/:0,1,2,3`，以分隔符 `:` 为分界，则返回：
        *   {
        *       dir: '/a/b/c/',     //目录名部分，必须以 `/` 结尾。
        *       file: '0,1,2,3',    //文件名部分，代表 `0.md`、`1.md`、`2.md`、`3.md` 共四个文件。
        *   }
        * 如果 hash 以 `@` 开头，则当成源文件模式，
        *   如：`@/es6/sidebar.json` 返回：
        *   {
        *       file: '@/es6/sidebar.json',   //源文件名，以 `@` 开头。
        *   }
        * 如果 hash 中含有 `:`，则当成 `url:value` 的格式进行解析。 其中：
        *   如果 url 以 `.json` 结尾，则当成 sidebar 显示，
        *   如 `/app/vGuide/sidebar.json:2/1`，则返回：
        *   {
        *       sidebar: '/app/vGuide/sidebar.json',
        *       item: '2/1',
        *   }
        * 其它情况，返回：
        *   {
        *       file: '',
        *   }
        * 
        */
        parse: function (hash) {
            if (!hash) {
                return {};
            }

            //处理 `#!~` 的情况。
            if (hash.startsWith('#')) {
                hash = hash.slice(1);
            }

            //当作 query 解析。
            if (hash.includes('=')) {
                hash = Query.parse(hash);
                return hash;
            }


            var isPlain = false;
            var isOutline = undefined; //这里用 undefined。 有 true、false、undefined 三种情况。

            if (hash.startsWith('!~') || hash.startsWith('~!')) {
                isPlain = true;
                isOutline = true;
                hash = hash.slice(2);
            }
            else {
                if (hash.startsWith('!')) {
                    hash = hash.slice(1);
                    isPlain = true;
                }
                else if (hash.startsWith('~')) {
                    hash = hash.slice(1);
                    isOutline = true;
                }
            }



            //解析如 `/a/b/c/:0,1,2,3` 这样的格式。
            //以分隔符 `:` 为分界，`/a/b/c/` 是目录名部分，`0,1,2,3` 是文件名部分。
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
                    'isPlain': isPlain,
                    'isOutline': isOutline,
                };
            }


            //file
            //如 `@/es6/sidebar.json`，显示源文件。
            var isOrigin = url.startsWith('@');

            if (isOrigin) {
                return {
                    'file': url,
                    'isPlain': isPlain,
                    'isOutline': isOutline,
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
                    'isOutline': isOutline,
                };
            }

            //把第 0 组的组号省略。
            //item，如 `2`
            if ((/^\d+$/).test(url)) {
                return {
                    'item': '0/' + url,
                    'isOutline': isOutline,
                };
            }

            //file
            return {
                'file': url,
                'isPlain': isPlain,
                'isOutline': isOutline,
            };

        },


        /**
        * 把一个对象序列化成字符串，以用在 hash 中。
        */
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





    