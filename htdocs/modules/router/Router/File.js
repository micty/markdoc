
/**
* 
*/
define('/Router/File', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    var base = '';



    return {
        /**
        * 初始化，设置基目录。
        */
        init: function (defaults) {
            base = defaults.base;
        },

        /**
        * 处理 url 中含有 `@` 或 `,` 的情况。
        */
        normalize: function (url) {
            var files = url.split(',');

            files = files.map(function (file) {
                var isOrigin = file.startsWith('@');

                if (isOrigin) {
                    file = file.slice(1);
                }


                //以 `/` 开头，则补充基目录。
                if (file.startsWith('/')) {
                    file = base + file.slice(1); 
                }

                //原来的是以 `@` 开头，则补回来。
                if (isOrigin) {
                    file = '@' + file;
                }

                return file;
            });

            url = files.join(',');

            return url;
        },

    };

});





    