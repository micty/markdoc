
; (function () {


    KISP.data({
        'API': {
            cache: false,
        },

        'config': {
            //要使用的全局配置文件。
            //可以在 query 中通过 `?config=data/config.json` 来指定使用。
            //该值由 `/Router` 模块动态写入，其它模块读取。
            url: 'data/config.json',

            //记录 `config.json` 文件所在的目录，以它作为根目录。 
            //路径中以 `/` 开头的路径都是相对于根目录的，如 `/a/b/demo.md`，则完整路径为 `data/a/b/demo.md`。
            //该值由 `/Router` 模块动态写入，其它模块读取。
            base: 'data/',
        },
    });



    /**weber.debug.begin*/

    KISP.data({
        'API': {
            cache: false,
        },
    });

    /**weber.debug.end*/


    KISP.config({
        'App': {
            name: 'markdoc-20190320',
        },
    });

})();





