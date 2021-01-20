
/**
* 
*/
define('/Router/Hash/File', function (require, module, exports) {
    
    let home = 'index.md'; //默认是 index.md



    return {
      

        /**
        * 
        */
        normalize: function (hash, old) {
            let file = hash.file || '';
            let dir = hash.dir || '';

            //let fileChanged = file && file != old.file;
            //let dirChanged = dir && dir != old.dir;
            //let chaned = fileChanged || dirChanged;

            //if (!chaned) {
            //    return;
            //}

            //此时为 sidebar 或其 item，而不是 file。
            if (hash.item || hash.sidebar) {
                return '';
            }

            //把基目录和文件名组合起来。
            let files = file.split(',').map(function (file) {
                if (!file) {
                    return dir + home; 
                }

                if (file.endsWith('/')) {
                    file = file + home;
                }

                let index = file.lastIndexOf('.');

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





    