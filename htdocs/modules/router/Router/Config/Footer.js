
/**
* 
*/
define('/Router/Config/Footer', function (require, module, exports) {
    const Url = require('Url');


    return {
        normalize: function (footer, url) {
            if (!footer) {
                return;
            }


            let menus = footer.menus = footer.menus || [];
            let logos = footer.logos = footer.logos || [];

            [...menus, ...logos].forEach(function (item) {
                let file = item.file;

                if (file) {
                    item.file = Url.relative(url, file);
                }
            });

        },

    };

});





    