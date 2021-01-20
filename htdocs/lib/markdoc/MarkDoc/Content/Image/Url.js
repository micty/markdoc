
/**
*/
define('MarkDoc/Content/Image/Url', function (require, module, exports) {
    const KISP = require('KISP');
    const Url = require('Url');





    return {
        /**
        * 把页面中的地址补充为相对完整的地址。
        *   src: '',    //要补充的地址。 如果为空或以 `http://`、`https://` 开头的，则不处理（即原样返回）。
        *   baseUrl,    //
        */
        pad: function (src, baseUrl) {
            let ok = !src ||
                src.startsWith('http://') ||
                src.startsWith('https://');

            //源地址不需要补充的。
            if (ok) {
                return src;
            }


            //绝对路径开头。
            if (src.startsWith('/')) {
                baseUrl = KISP.data('config').base; //取配置文件里的基路径。 是以 `/` 结尾的。
                src = src.slice(1);
            }

            //基地址为空，也不需要补充完整。
            if (!baseUrl) {
                return src;
            }


            baseUrl = Url.dir(baseUrl);         //提前目录部分。
            src = baseUrl + src;
            src = Url.resolve(src);

            return src;
        },
    };




   




});
