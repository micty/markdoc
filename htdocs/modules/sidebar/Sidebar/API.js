
/**
* 
*/
define('/Sidebar/API', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    var Emitter = KISP.require('Emitter');
    var API = require('API');
    var Url = require('Url');

    var emitter = new Emitter();


    return {
        'get': function (url) {
            var api = new API(url);

            api.on({
                'success': function (json, options) {
                    var url = options.url;

                    ['logo', 'file', ].forEach(function (key) {
                        var file = json[key];
                        if (file) {
                            json[key] = Url.relative(url, file);
                        }
                    });


                    var groups = json.groups || [];

                    groups.forEach(function (group, index) {
                        var items = group.items || [];
                        var base = group.base || '';
                        var ext = group.ext || '';

                        //如果没有二级列表，则把当前的 group 当成是二级列表的一个 item。
                        if (items.length == 0) {
                            items = [
                                {
                                    'name': group.name,
                                    'file': group.file,
                                    'icon': group.icon,
                                },
                            ];

                            //这里要用 groups[index]，不要用 group。
                            groups[index] = {
                                'name': '',
                                'items': items,
                            };
                        }

                        //处理二级列表的文件路径。
                        items.forEach(function (item) {
                            var file = item.file;
                            if (!file) {
                                return;
                            }

                            file = base + file + ext;
                            item.file = Url.relative(url, file);
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





    