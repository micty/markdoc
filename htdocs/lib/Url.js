
define('Url', function (require, module) {
    

    var resolveUrl = require('resolveUrl');


    return {

        relative: function (baseUrl, file) {

            //������ './' �� '../' ��ͷ�ģ�������
            if (file.indexOf('.') != 0) {
                return file;
            }

            var dir = baseUrl.split('/').slice(0, -1).join('/') + '/';  //��ȡ��Ŀ¼
            var url = resolveUrl(dir, file);    //��ȡ���� url
            var root = resolveUrl('./');        //��ǰҳ���Ŀ¼����Ϊ�ǵ�ҳ����������վ��Ŀ¼��

            url = url.slice(root.length);

            return url;
        },

        extname: function (file) {

            var index = file.lastIndexOf('.');

            if (index < 0) {
                return '';
            }


            var ext = file.slice(index + 1).toLowerCase();
            return ext;
        },

        resolve: function () {
            var args = [].slice.call(arguments);
            return resolveUrl.apply(resolveUrl, args);
        },


        dir: function (url) {
            url = url.split('#')[0];
            url = url.split('?')[0];

            var dir = url.split('/').slice(0, -1).join('/') + '/';  //��ȡ��Ŀ¼
            return dir;
        },
        
    };

});