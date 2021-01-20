
/**
* 
*/
define('/Router/Config/Header', function (require, module, exports) {
    const Url = require('Url');


    return {
        normalize: function (header, url) {
            if (!header) {
                return;
            }


            [ 'logo', ].forEach(function (key) {
                let file = header[key];

                if (file) {
                    header[key] = Url.relative(url, file);
                }
            });


            let menus = header.menus = header.menus || [];

            menus.forEach(function (group) {
                let file = group.file;

                if (file) {
                    group.file = Url.relative(url, file);
                }


                let items = group.items;

                if (items) {
                    let base = group.base || '';
                    let ext = group.ext || '';

                    items.forEach(function (item) {
                        let file = item.file;

                        if (file) {
                            file = base + file + ext;
                            item.file = Url.relative(url, file);
                        }
                    });
                }
            });

        },

    };

});





    