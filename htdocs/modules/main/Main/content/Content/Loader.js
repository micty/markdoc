
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
    function format(url, md) {

        var ext = Url.extname(url);

        if (!ext || ext == 'md' || ext == 'txt' || ext== 'markdown') {
            return md;
        }

        md = '``` ' + ext + '\r\n' +
                md + '\r\n' +
            '```';

        return md;
    }





    return {

        'load': function (url, fn) {

            var urls = url.split(',');
            var tasks = new ParallelTasks(urls);
            var values = [];

            tasks.on('each', function (url, index, done) {

                var api = new API(url);

                api.on('success', function (md) {
                    md = format(url, md);
                    values[index] = md;      //内容有顺序关系。
                    done();
                });

                api.get();
            });



            //子任务并行处理完成。
            tasks.on('all', function () {
                fn && fn(values.join(''));
            });

            tasks.run();
        },
    };


});
