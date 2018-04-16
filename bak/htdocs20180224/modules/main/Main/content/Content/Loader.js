
/**
*/
define('/Main/Content/Loader', function (require, module, exports) {

    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Url = require('Url');

    var Tasks = KISP.require('Tasks');



    return {

        load: function (url, fn) {
            var urls = url.split(',');
            var tasks = new Tasks(urls);
            var values = [];

            var info = null;


            tasks.on('each', function (url, index, done) {

                var api = new API(url);

                api.on('success', function (content, options) {
                    //以首个为准。
                    if (index == 0) {
                        var ext = options.ext;

                        //根据后缀名判断需要作为纯文本进行显示的后缀名。
                        var isPlain = !ext || ext == 'md' || ext == 'txt' || ext == 'markdown'; 

                        //如果不明确指定为源代码模式，则通过后缀名进行判断。
                        var isOrigin = options.isOrigin || !isPlain; 

                        info = {
                            'ext': ext,
                            'isOrigin': isOrigin,
                            'url': options.url,
                        };
                    }
                  
                    values[index] = content;      //内容有顺序关系。

                    done();
                });

                api.get();
            });



            //子任务并行处理完成。
            tasks.on('all', function () {

                fn && fn(values.join(''), info);
            });

            tasks.parallel();
        },
    };


});