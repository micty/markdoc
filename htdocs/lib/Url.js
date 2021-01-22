

/**
* 
*/
define('Url', function (require, module, exports) {
    const Url = require('@definejs/url');
    const resolveUrl = require('resolveUrl');

    let root = Url.root();



    return exports = {

        relative: function (baseUrl, file) {

            //不是以 './' 或 '../' 开头的，不处理
            if (file.indexOf('.') != 0) {
                return file;
            }

            let dir = baseUrl.split('/').slice(0, -1).join('/') + '/';  //提取出目录
            let url = resolveUrl(dir, file);    //获取完整 url
            let root = resolveUrl('./');        //当前页面的目录，因为是单页，所以是网站根目录。

            url = url.slice(root.length);

            return url;
        },

        extname: function (file) {

            let index = file.lastIndexOf('.');

            if (index < 0) {
                return '';
            }


            let ext = file.slice(index + 1).toLowerCase();
            return ext;
        },


        resolve: function (...args) {
            let url = resolveUrl(...args);

            //如果是以本网站的根目录开头的，则只保留相对部分。
            if (url.startsWith(root)) {
                url = url.slice(root.length);
            }

            return url;
        },


        dir: function (url) {
            url = url.split('#')[0];
            url = url.split('?')[0];

            let dir = url.split('/').slice(0, -1).join('/') + '/';  //提取出目录
            return dir;
        },
        

       

    };

});