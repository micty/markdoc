
/**
* 
*/
define('/Router/Hash/File', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    
    var home = 'index.md'; //默认是 index.md



    return {
      

        /**
        * 
        */
        normalize: function (hash, old) {
            var file = hash.file || '';
            var dir = hash.dir || '';

            //var fileChanged = file && file != old.file;
            //var dirChanged = dir && dir != old.dir;
            //var chaned = fileChanged || dirChanged;

            //if (!chaned) {
            //    return;
            //}

            //此时为 sidebar 或其 item，而不是 file。
            if (hash.item || hash.sidebar) {
                return '';
            }

            //把基目录和文件名组合起来。
            var files = file.split(',').map(function (file) {
                if (!file) {
                    return dir + home; 
                }

                if (file.endsWith('/')) {
                    file = file + home;
                }

                var index = file.lastIndexOf('.');

                if (index < 0) { //不含有后缀名
                    file += '.md';
                }

                file = dir + file;

                return file;
            });

            file = files.join(',');

            return file;

        },

    };

});





    