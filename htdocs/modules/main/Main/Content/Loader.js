
/**
*/
define('/Main/Content/Loader', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');
    var Url = MiniQuery.require('Url');
    var ParallelTasks = require('ParallelTasks');

    var url$md = {}; //缓存读取到的 md 内容



    //根据后缀名加上相应的语言类型。
    function format(url, md) {
        var index = url.lastIndexOf('.');
        if (index < 0) {
            return md;
        }

        var ext = url.slice(index + 1);
        ext = ext.toLowerCase();

        if (!ext || ext == 'md' || ext == 'txt' || ext== 'markdown') {
            return md;
        }


        md = '``` ' + ext + '\r\n' +
                md + '\r\n' +
            '```';

        return md;

    }




    //单个加载
    function load(url, fn) {
        var md = url$md[url];
        if (md) {
            fn && fn(md);
            return;
        }

        $.ajax({
            'type': 'get',
            'dataType': 'text', //作纯文本返回
            'url': Url.randomQueryString(url),  //加上随机查询字符串，以确保拿到最新版本。

            'success': function (md) {
                md = format(url, md);
                url$md[url] = md; //缓存起来
                fn && fn(md);
            },

            'error': function (xhr) {
                fn && fn('');
            },
        });
    }


    


    return {

        'load': function (url, fn) {

            var urls = url.split(',');
            console.dir(urls);


            var tasks = new ParallelTasks(urls);
            var values = [];

            tasks.on('each', function (url, index, done) {

                load(url, function (value) {
                    values[index] = value;      //内容有顺序关系。
                    done();
                });
            });

            //子任务并行处理完成。
            tasks.on('all', function () {
                fn && fn(values.join(''));
            });

            tasks.run();
        },
    };


});
