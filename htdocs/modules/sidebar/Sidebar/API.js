
/**
* 
*/
define('/Sidebar/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    
    const API = require('API');
    const Url = require('Url');

    let emitter = new Emitter();


    return {
        'get': function (url) {
            let api = new API(url);

            api.on({
                'success': function (json, options) {
                    let url = options.url;

                    ['logo', 'file', ].forEach(function (key) {
                        let file = json[key];
                        if (file) {
                            json[key] = Url.relative(url, file);
                        }
                    });


                    let groups = json.groups || [];

                    groups.forEach(function (group, index) {
                        let items = group.items || [];
                        let base = group.base || '';
                        let ext = group.ext || '';

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
                            let file = item.file;
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





    