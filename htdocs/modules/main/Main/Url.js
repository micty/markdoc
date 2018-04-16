
define('/Main/Url', function (require, module, exports) {

    var $ = require('$');

    var texts = [
        'md',
        'txt',
        'markdown',
    ];

    var images = [
       'png',
       'jpg',
       'jpeg',
       'gif',
       'bmp',
    ];


    return {
        'parse': function (url) {

            var isOrigin = url.startsWith('@');
            if (isOrigin) {
                url = url.slice(1);
            }

            var index = url.lastIndexOf('.');

            if (index < 0) {
                return {
                    'url': url,
                    'name': url,
                    'ext': '',
                    'isCode': isOrigin,
                };
            }


            var ext = url.slice(index + 1).toLowerCase();
            var name = url.split('/').slice(-1)[0]; //取最后一部分的短名称

            var isMarkdown = texts.includes(ext) || images.includes(ext); //

            return {
                'url': url,
                'name': name,
                'ext': ext,
                'isCode': isOrigin || !isMarkdown,
            };
        },
    };

});
