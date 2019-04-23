
/**
* 
*/
define('MarkDoc/Meta', function (require, module, exports) {
    var $ = require('$');
    var $String = KISP.require('String');
    var Template = KISP.require('Template');
    var Panel = KISP.require('Panel');




    return {
        /**
        * 
        */
        create: function (config, others) {
            var tpl = new Template('#tpl-MarkDoc');
            var container = config.container;
            var panel = new Panel(container);

            var meta = {
                'id': $String.random(),         //实例 id。
                'container': container,         //

                'titles': config.titles,        //
                'code': config.code,            //
                'replace': config.replace,      //

                'panel': panel,                 //container 对应的 Panel 实例。
                'this': null,                   //方便内部引用自身的实例。
                'emitter': null,                //事件驱动器。
                '$': $(container),              //$(container);
                'tpl': tpl,                     //Template 实例。

                'bind': false,                  //是否已对 meta.$ 进行绑定事件。

                'outline': {
                    'visible': true,            //用于记录提纲的内容的显示或隐藏状态。
                },

                'current': {

                },


                'samples': {
                    'source': tpl.sample('source'),
                    'language': tpl.sample('language'),
                    'pre': tpl.sample('pre'),
                    'numbers': tpl.sample('numbers'),
                    'numbers.item': tpl.sample('numbers', 'item'),
                    'title': tpl.sample('title'),
                },

                //默认的内容处理函数，用于触发事件，让外界进行处理。
                'process': function (content) {
                    var values = meta.emitter.fire('process', [content]);

                    return values.length > 0 ? values[0] : content;
                },

               
            };


            Object.assign(meta, others);
           

            return meta;
           
        },

    };
    
});


