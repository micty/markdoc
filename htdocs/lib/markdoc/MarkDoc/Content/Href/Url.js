
/**
*/
define('MarkDoc/Content/Href/Url', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var Query = KISP.require('Query');
    var Hash = KISP.require('Hash');
    var Url = require('Url');
    var base = KISP.data('config').base;    //如 `data/`



    //获取相对路径
    function relative(baseUrl, file) {
        var dir = baseUrl.split('/').slice(0, -1).join('/') + '/';  //提取出目录
        var url = Url.resolve(dir, file);    //获取完整 url

        return url;
    }


  


    return {
        /**
        * 根据相对路径获取最终路径。
        */
        getHref: function (href, baseUrl) {
            var qs = Query.get(href) || {};
            var file = qs.file;
            var dir = qs.dir;

            if (!file) {
                href = Url.resolve(baseUrl, href);
                return href;
            }


            if (dir) {
                dir = relative(baseUrl, dir);
            }

            var list = file.split(',');

            if (!dir) {
                list = list.map(function (file) {
                    if (file.startsWith('/')) {
                        file = base + file.slice(1);
                    }
                    else {
                        file = relative(baseUrl, file);
                    }

                    return file;
                });
            }
            

     
            file = list.join(',');
           

            if (dir) {
                href = Query.add(href, 'dir', dir);
            }

            href = Query.add(href, 'file', file);

            return href;
        },



        //把超链接中以查询字符串开头的 url 改成以 hash 开头。
        //主要是为了方便用户写链接，因为查询字符串比复合结构的 hash 容易写。
        getHash: function (href) {
            var qs = Query.get(href);
            var hash = Hash.set('', qs); //把查询字符串变成 hash

            return hash;
        },
    };




   




});
