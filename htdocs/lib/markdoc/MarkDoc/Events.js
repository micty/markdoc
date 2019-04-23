
/**
* 
*/
define('MarkDoc/Events', function (require, module, exports) {

    var $ = require('$');
    var $String = KISP.require('String');
    var Template = KISP.require('Template');



    return {
        
        /**
        * 
        */
        bind: function (meta) {

            meta.bind = true;


            if (meta.code.foldable) {

                meta.panel.$on('click', '[data-cmd="{value}"]', {
                    //点击语言标签时。
                    'language': function (event) {
                        var $div = $(this.parentNode);

                        $div.toggleClass('on');

                        setTimeout(function () {
                            $div.toggleClass('done');
                        }, 300);

                        event.stopPropagation();
                    },

                    //折叠起来时，整个源代码区别可点击。
                    'source-code': function (event) {
                        var $div = $(this);

                        $div.removeClass('on done');
                    },

                });
            }



            //点击超链接时。
            meta.$.on('click', 'a[href^="#"]', function (event) {
                var a = this;
                var href = a.getAttribute('href');

                event.preventDefault();
                meta.emitter.fire('hash', [href]);
            });
            


            if (meta.titles.foldable) {
                //点击标题时。
                meta.$.on('click', meta.titles.selector, function (event) {
                    if (event.target.tagName.toLowerCase() != 'span') {
                        return;
                    }

                    $(this).nextUntil(meta.titles.selector).animate({
                        height: 'toggle',
                        opacity: 'toggle',
                    });
                });

            }

           
        },

    };
    
});


