
/**
* 
*/
define('API', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');
    var JSON = require('JSON');
    var Url = require('Url');

    var Emitter = MiniQuery.require('Emitter');
    var Mapper = MiniQuery.require('Mapper');

    var mapper = new Mapper();
    var $emitter = new Emitter();   //针对静态的。
    var url$data = {};


    function API(url) {

        var ext = Url.extname(url);

        var meta = {
            'url': url,
            'ext': ext,
            'emitter': new Emitter(this),
        };

        mapper.set(this, meta);

    }




    API.prototype = {

        on: function (name, fn) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var args = [].slice.call(arguments);
            emitter.on.apply(emitter, args);
        },

        get: function () {
            var meta = mapper.get(this);
            var url = meta.url;
            var emitter = meta.emitter;
            var ext = meta.ext;
            var data = url$data[url];

            if (data) {
                if (ext == 'json') {
                    data = JSON.parse(data);          //拷贝一份。
                }
                emitter.fire('success', [data, url]);
                return;
            }


            
            $.ajax({
                'url': url,
                'cache': false,     //不缓存，以确保拿到最新版本。
                'dataType': 'text', //这里作为纯文本去获取，获取到后再解析，这样可以对 json 格式没那么严格。     

                'success': function (data) {
                    url$data[url] = data;

                    if (ext == 'json') {
                        data = JSON.parse(data);
                    }

                    emitter.fire('success', [data, url]);
                },

                'error': function (xhr, type, msg) {
                    emitter.fire('error');
                    $emitter.fire(xhr.status, [url]);
                },
            });
        },
    };


    //静态方法。
    API.on = function () {
        var args = [].slice.call(arguments);
        $emitter.on.apply($emitter, args);
    };


    return API;



});
