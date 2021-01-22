
/**
* 
*/
define('API', function (require, module, exports) {
    const $ = require('$');
    const Emitter = require('@definejs/emitter');
    const JSON = require('@definejs/json');
    const Url = require('Url');


    let mapper = new Map();
    let $emitter = new Emitter();   //针对静态的。
    let url$data = {};
    let defaults = module.data;
    let baseDir = defaults.base;

    let images = [
        'png',
        'jpg',
        'jpeg',
        'gif',
        'bmp',
    ];



    /**
    * 构造器。
    */
    function API(url) {
        let ext = Url.extname(url);
        let dir = Url.dir(url);
        let isOrigin = url.startsWith('@');
        let isImage = images.includes(ext);
        
        //如果是图片，则当成一个含有该图片的 md 来处理。
        if (isImage) {
            let img = url;

            if (img.startsWith(baseDir)) {
                img = img.slice(baseDir.length);
            }

            url$data[url] = '![](' + img + ')';
            ext = 'md';
            isOrigin = false;
        }
        else {
            if (isOrigin) {
                url = url.slice(1);
            }

            //这个关闭，否则在内容区会死循环加载。
            if (ext == 'html' || ext == 'htm') {
                isOrigin = false;
            }
        }


        let meta = {
            'url': url,
            'dir': dir,
            'ext': ext,
            'isOrigin': isOrigin,
            'isImage': isImage,
            'emitter': new Emitter(this),
        };

        mapper.set(this, meta);
    }




    API.prototype = {
       
        /**
        * 获取。
        */
        get: function () {
            let meta = mapper.get(this);
            let url = meta.url;
            let emitter = meta.emitter;
            let ext = meta.ext;
            let isOrigin = meta.isOrigin;
            let data = url$data[url];

            //优先从内存中读取。
            if (data) {
                if (ext == 'json' && !isOrigin) {
                    data = JSON.parse(data);          //拷贝一份。
                }

                emitter.fire('success', [data, {
                    'url': url,
                    'dir': meta.dir,
                    'ext': ext,
                    'isOrigin': isOrigin,
                    'baseDir': baseDir,
                }]);


                return;
            }

            
            $.ajax({
                'url': url,
                'cache': defaults.cache,    //缓存。
                'dataType': 'text',         //这里作为纯文本去获取，获取到后再解析，这样可以对 json 格式没那么严格。     

                'success': function (data) {
                    url$data[url] = data;

                    if (ext == 'json' && !isOrigin) {
                        data = JSON.parse(data);
                    }

                    emitter.fire('success', [data, {
                        'url': url,
                        'dir': meta.dir,
                        'ext': ext,
                        'isOrigin': isOrigin,
                        'baseDir': baseDir,
                    }]);
                },

                'error': function (xhr, type, msg) {
                    console.log(arguments);
                    emitter.fire('error');
                    $emitter.fire(xhr.status, [url]);
                },
            });
        },

        /**
        * 绑定事件。
        */
        on: function (name, fn) {
            let meta = mapper.get(this);
            meta.emitter.on(...arguments);
        },
    };



    //静态方法。
    API.on = $emitter.on.bind($emitter);


    return API;



});
