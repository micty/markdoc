
/**
* 
*/
define('MarkDoc/Content/Image', function (require, module, exports) {
    var $ = require('$');
    var Url = module.require('Url');


    return {

        /**
        * 对非完整地址的图片进行地址补充。
        *   
        *   opt = {
        *       baseUrl: '',    //
        *   };
        */
        render: function (meta, opt) {
            var panel = meta.panel;

            panel.$.find('img').each(function () {
                var img = this;
                var src = img.getAttribute('src'); //要用这个方法，获取原始的值。 因为 img.src 会返回完整的，不合要求。

                console.log('image src=================', src)

                src = Url.pad(src, opt.baseUrl);
                img.src = src;

            });

        },

    };
    
});


