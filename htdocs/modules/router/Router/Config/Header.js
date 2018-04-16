
/**
* 
*/
define('/Router/Config/Header', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    var Url = require('Url');


    return {
        normalize: function (header, url) {
            if (!header) {
                return;
            }


            [ 'logo', ].forEach(function (key) {
                var file = header[key];

                if (file) {
                    header[key] = Url.relative(url, file);
                }
            });


            var menus = header.menus = header.menus || [];

            menus.forEach(function (group) {
                var file = group.file;

                if (file) {
                    group.file = Url.relative(url, file);
                }


                var items = group.items;

                if (items) {
                    var base = group.base || '';
                    var ext = group.ext || '';

                    items.forEach(function (item) {
                        var file = item.file;

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





    