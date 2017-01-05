
/**
*/
define('/Main/Content/Loader', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var KISP = require('KISP');
    var API = require('API');
    var Url = require('Url');

    var ParallelTasks = require('ParallelTasks');


    //根据后缀名加上相应的语言类型。
    function format(content, url, isOrigin) {


        var ext = Url.extname(url);

        if (isOrigin) {
            return content;
        }



        if (!ext || ext == 'md' || ext == 'txt' || ext== 'markdown') {
            return content;
        }

        content =
            '``` ' + ext + '\r\n' +
                content + '\r\n' +
            '```';

        return content;
    }





    return {

        'load': function (url, fn) {

            var urls = url.split(',');
            var tasks = new ParallelTasks(urls);
            var values = [];
            var isOrigin = false;
            var ext = '';

            tasks.on('each', function (url, index, done) {

                var api = new API(url);

                api.on('success', function (content, url, origin) {

                    if (index == 0) {
                        isOrigin = origin;
                        ext = Url.extname(url);
                    }
                  

                    content = format(content, url, origin);
                    values[index] = content;      //内容有顺序关系。
                    done();
                });

                api.get();
            });



            //子任务并行处理完成。
            tasks.on('all', function () {
                fn && fn(values.join(''), {
                    'isOrigin': isOrigin,
                    'ext': ext,
                });
            });

            tasks.run();
        },
    };


});
