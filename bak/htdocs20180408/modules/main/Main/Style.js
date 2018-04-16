
define('/Main/Style', function (require, module, exports) {

    var $ = require('$');
    var panel = null;



    return {
        init: function (objPanel) {
            panel = objPanel;
        },


        setPadding: function (sidebar) {
            //sidebar 是否可见。
            if (!sidebar) { 
                panel.$.css('padding-right', '');
                return;
            }

            var w = document.documentElement.clientWidth;
            var max = 260 + 52 + 1024;
            var p = w - max;

            p = Math.min(p, 260 + 52);
            p = Math.max(p, 52);

            panel.$.css('padding-right', p + 'px');
        },


        setWidth: function (config, isCode) {
            //代码模式下，不限制 width 和 padding，让它充满页面。
            if (isCode) {
                panel.$.css({
                    'min-width': '',
                    'max-width': '',
                    'padding': '',
                });
                return;
            }

            //普通模式下，如果配置中指定了 width 和 padding，则设置。
            var minWidth = config['min-width'];
            var maxWidth = config['max-width'];
            var padding = config['padding'];

            if (typeof minWidth == 'number') {
                panel.$.css('min-width', minWidth + 'px');
            }

            if (typeof maxWidth == 'number') {
                panel.$.css('max-width', maxWidth + 'px');
            }

            if (typeof padding == 'number') {
                padding += 'px';
            }

            if (padding) {
                panel.$.css('padding', padding );
            }
        },
    };

});
