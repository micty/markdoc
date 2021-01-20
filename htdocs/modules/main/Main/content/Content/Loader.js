
/**
*/
define('/Main/Content/Loader', function (require, module, exports) {
    const KISP = require('KISP');
    const API = require('API');
    const Tasker = KISP.require('Tasker');


    let texts = [
        'md',
        'txt',
        'markdown',
    ];


    return {

        load: function (url, fn) {
            let urls = url.split(',');
            let tasks = new Tasker(urls);
            let values = [];

            let info = null;


            tasks.on('each', function (url, index, done) {

                let api = new API(url);

                api.on('success', function (content, options) {
                    //以首个为准。
                    if (index == 0) {
                        let ext = options.ext;

                        //根据后缀名判断需要作为纯文本进行显示的后缀名。
                        let isPlain = !ext || texts.includes(ext);

                        //如果不明确指定为源代码模式，则通过后缀名进行判断。
                        let isOrigin = options.isOrigin || !isPlain; 

                        //debugger

                        info = {
                            'ext': ext,
                            'isOrigin': isOrigin,
                            'url': options.url,
                            'dir': options.dir,
                            'baseDir': options.baseDir,
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
