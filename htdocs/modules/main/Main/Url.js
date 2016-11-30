
define('/Main/Url', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');


    function parse(url) {

        var index = url.lastIndexOf('.');

        if (index < 0) {
            return {
                'url': url,
                'name': url,
                'ext': '',
                'isCode': false,
            };
        }


        var ext = url.slice(index + 1).toLowerCase();
        var name = url.split('/').slice(-1)[0]; //取最后一部分的短名称

        var isMarkdown =
                ext == 'md' ||
                ext == 'txt' ||
                ext == 'markdown';

        return {
            'url': url,
            'name': name,
            'ext': ext,
            'isCode': !isMarkdown,
        };
    }




    return {
        'parse': parse,
    };

});
