
/**
* 
*/
define('/Router/Config', function (require, module, exports) {


    var KISP = require('KISP');
    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Emitter = MiniQuery.require('Emitter');
    var API = require('API');
    var Url = require('Url');

    var emitter = new Emitter();


    return {
        'get': function (url) {
            var api = new API(url);

            api.on({
                'success': function (data, url) {
               

                    var json = JSON.stringify(data);
                    json = JSON.parse(json);


                    [
                        'file',
                        'sidebar',
                    ].forEach(function (key) {
                        var file = json[key];
                        if (file) {
                            json[key] = Url.relative(url, file);
                        }
                    });


                    //header
                    var header = json.header || {};
                    var menus = header.menus = header.menus || [];

                    [
                        'logo',
                    ].forEach(function (key) {
                        var file = header[key];
                        if (file) {
                            header[key] = Url.relative(url, file);
                        }
                    });


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


                    //footer
                    var footer = json.footer;
                    var menus = footer.menus = footer.menus || [];

                    menus.forEach(function (item) {
                        var file = item.file;
                        if (file) {
                            item.file = Url.relative(url, file);
                        }
                    });


                    var logos = footer.logos = footer.logos || [];

                    logos.forEach(function (item) {
                        var file = item.file;
                        if (file) {
                            item.file = Url.relative(url, file);
                        }
                    });


                  
                    emitter.fire('success', [json, url]);
                },

                'error': function () {

                },
            });

            api.get();

        },

        'on': emitter.on.bind(emitter),
    };

});





    