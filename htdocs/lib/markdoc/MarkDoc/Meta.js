
/**
* 
*/
define('MarkDoc/Meta', function (require, module, exports) {
    const $String = require('@definejs/string');
    const Template = require('@definejs/template');
    const Panel = require('@definejs/panel');




    return {
        /**
        * 
        */
        create: function (config, others) {
            let tpl = new Template('#tpl-MarkDoc');
            let container = config.container;
            let panel = new Panel(container);


            let meta = {
                'id': $String.random(),         //实例 id。
                'container': container,         //

                'titles': config.titles,        //
                'code': config.code,            //
                'replace': config.replace,      //

                'panel': panel,                 //container 对应的 Panel 实例。
                'this': null,                   //方便内部引用自身的实例。
                'emitter': null,                //事件驱动器。
                'tpl': tpl,                     //Template 实例。
                'outlines': [],                 //提纲列表。


                //默认的内容处理函数，用于触发事件，让外界进行处理。
                process: function (content) {
                    let values = meta.emitter.fire('process', [content]);

                    return values.length > 0 ? values[0] : content;
                },

               
            };


            Object.assign(meta, others);
           

            return meta;
           
        },

    };
    
});


