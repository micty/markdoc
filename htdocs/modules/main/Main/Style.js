
define('/Main/Style', function (require, module, exports) {

    var $ = require('$');
    var panel = null;



    return {
        init: function (objPanel) {
            panel = objPanel;
        },

        /**
        *
        *   options = {
        *       sidebar: false,     //侧边栏是否显示。
        *       outline: false,     //提纲栏是否显示。
        *   };
        */
        setPadding: function (options) {

            var sidebar = options.sidebar;
            var outline = options.outline;
            
            //sidebar 不可见。
            if (!sidebar) {
                var p = outline ? '380px' : '';
                panel.$.css('padding-right', p);
                return;
            }



            var w = document.documentElement.clientWidth;
            var min = 60 ;
            var max = 260 + min + 1024; //260 是左边 sidebar 的宽度。
            var p = w - max;

            console.log(w, p);

            p = Math.min(p, 260 + min);
            p = Math.max(p, min);

            //提纲栏显示了。
            if (outline) {
                p = Math.max(p, 330); //不能小于 330
            }

            panel.$.css('padding-right', p + 'px');
        },


        /**
        *   
        *   options = {
        *       'isCode': false,    //可选。
        *       'min-width': 0,     //可选。
        *       'max-width': 0,     //可选。
        *   };
        */
        setWidth: function (options) {
            //代码模式下，不限制 width 和 padding，让它充满页面。
            if (options.isCode) {
                panel.$.css({
                    'min-width': '',
                    'max-width': '',
                    'padding': '',
                });
                return;
            }

            //普通模式下，如果配置中指定了 width，则设置。
            var minWidth = options['min-width'];
            var maxWidth = options['max-width'];

            if (typeof minWidth == 'number') {
                panel.$.css('min-width', minWidth + 'px');
            }

            if (typeof maxWidth == 'number') {
                panel.$.css('max-width', maxWidth + 'px');
            }

        },
    };

});
