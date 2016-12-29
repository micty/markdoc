
define('Url', function (require, module) {
    

    var resolveUrl = require('resolveUrl');


    return {

        relative: function (baseUrl, file) {

            //不是以 './' 或 '../' 开头的，不处理
            if (file.indexOf('.') != 0) {
                return file;
            }

            var dir = baseUrl.split('/').slice(0, -1).join('/') + '/';  //提取出目录
            var url = resolveUrl(dir, file);    //获取完整 url
            var root = resolveUrl('./');        //当前页面的目录，因为是单页，所以是网站根目录。

            url = url.slice(root.length);

            return url;
        },

        extname: function (file) {

            var index = file.lastIndexOf('.');

            if (index < 0) {
                return '';
            }


            var ext = file.slice(index + 1).toLowerCase();
            return ext;
        },

        resolve: function () {
            var args = [].slice.call(arguments);
            return resolveUrl.apply(resolveUrl, args);
        },


        dir: function (url) {
            url = url.split('#')[0];
            url = url.split('?')[0];

            var dir = url.split('/').slice(0, -1).join('/') + '/';  //提取出目录
            return dir;
        },
        
    };

});