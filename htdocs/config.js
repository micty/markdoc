

; (function (definejs) {

    var AppModule = definejs.require('AppModule');
    var define = window.define = AppModule.define;

    Object.assign(define, {
        'panel': definejs.panel,
        'view': definejs.view,
        'module': definejs.define,
        'data': definejs.data,
        'route': definejs.route,
        'proxy': definejs.proxy,
    });

    //多个模块要公用的配置。
    define.data([
        'API',
        'MarkDoc/Content/Href/Url',
        'MarkDoc/Content/Image/Url',
        '/Router',
    ], {
        //要使用的全局配置文件。
        //可以在 query 中通过 `?config=data/config.json` 来指定使用。
        //该值由 `/Router` 模块动态写入，其它模块读取。
        url: 'data/config.json',

        //记录 `config.json` 文件所在的目录，以它作为根目录。 
        //路径中以 `/` 开头的路径都是相对于根目录的，如 `/a/b/demo.md`，则完整路径为 `data/a/b/demo.md`。
        //该值由 `/Router` 模块动态写入，其它模块读取。
        base: 'data/',
    });



    //业务端模块的默认配置。
    define.data({

        'API': {
            cache: false,

            
        },
        '/About': {
            copyright: '2020 webpart', 
        },
    });

  


    // definejs 内部模块所需要的默认配置
    definejs.config({
        'API': {
            // proxy: true,


            /**
            * API 接口 Url 的主体部分。
            * 模块 Env 会配置进去。
            */
            url: '',


            /**
            * API 接口 Url 的后缀部分。
            * 针对那些如 '.do'、'.aspx' 等有后缀名的接口比较实用。
            */
            ext: '',

            /**
            * 在 url 中增加一个随机 key，以解决缓存问题。
            * 当指定为 false 时，则禁用。
            */
            random: false,

            //为了防止后台过快的返回数据而显示让某些需要显示
            //"数据加载中"的效果不明显， 这里强行加上一个随机延迟时间。
            delay: {
                min: 400,
                max: 800,
            },

        },
 
        'View': {
            //background: '#EFEFF4',
            background: '#fff',
        },

        'Proxy': {
            base: 'api/',
        },

        'App': {
            name: 'markdoc-definejs-20210120',
        },

        'Masker': {
            fadeIn: 200,
            fadeOut: 200,
        },
        
    });




})(window.definejs);


