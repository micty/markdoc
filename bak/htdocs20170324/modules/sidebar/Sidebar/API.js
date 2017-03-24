
/**
* 
*/
define('/Sidebar/API', function (require, module, exports) {


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
                'success': function (json, url) {
                    [
                        'logo',
                        'file',
                    ].forEach(function (key) {
                        var file = json[key];
                        if (file) {
                            json[key] = Url.relative(url, file);
                        }
                    });


                    var groups = json.groups || [];

                    groups.forEach(function (group) {
                        var file = group.file;
                        if (file) {
                            group.file = Url.relative(url, file);
                        }

                        var items = group.items || [];
                        var base = group.base || '';
                        var ext = group.ext || '';

                        items.forEach(function (item) {
                            var file = item.file;
                            if (file) {
                                file = base + file + ext;
                                item.file = Url.relative(url, file);
                            }
                        });
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





    