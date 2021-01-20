
define('/Main/Url', function (require, module, exports) {


    let texts = [
        'md',
        'txt',
        'markdown',
    ];

    let images = [
       'png',
       'jpg',
       'jpeg',
       'gif',
       'bmp',
    ];


    return {
        'parse': function (url) {

            let isOrigin = url.startsWith('@');
            if (isOrigin) {
                url = url.slice(1);
            }

            let index = url.lastIndexOf('.');

            if (index < 0) {
                return {
                    'url': url,
                    'name': url,
                    'ext': '',
                    'isCode': isOrigin,
                };
            }


            let ext = url.slice(index + 1).toLowerCase();
            let name = url.split('/').slice(-1)[0]; //取最后一部分的短名称

            let isMarkdown = texts.includes(ext) || images.includes(ext); //

            return {
                'url': url,
                'name': name,
                'ext': ext,
                'isCode': isOrigin || !isMarkdown,
            };
        },
    };

});
