
/**
* 
*/
define('/Router/Config/Footer', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    var Url = require('Url');


    return {
        normalize: function (footer, url) {
            if (!footer) {
                return;
            }


            var menus = footer.menus = footer.menus || [];
            var logos = footer.logos = footer.logos || [];

            [...menus, ...logos].forEach(function (item) {
                var file = item.file;

                if (file) {
                    item.file = Url.relative(url, file);
                }
            });

        },

    };

});





    