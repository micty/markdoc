
define('/Scroller', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');


    var KISP = require('KISP');
    var panel = KISP.create('Panel');
    

    var recent = 0;         //上次滚动后的 scrollTop 值。
    var isUping = false;
    var isDowning = false;
    var isCode = false;
    var max = 67;


    panel.on('init', function () {

        var leaved = false;

        $(window).on('scroll', function (event) {
            var height = document.body.scrollTop;
            var delta = height - recent;

            //在快速向上滚动过程中，有时会产生向下滚动的 1px 的情况。
            if (Math.abs(delta) <= 1) {
                if (height == 0) {
                    panel.fire('top');
                }

                return;
            }
          

            //向上滚动
            if (delta < 0) {
                if (isUping) {          //上次已经是向上的
                    isDowning = false;
                }
                else {
                    isUping = true;

                    //源代码视图时，不触发 up 事件。
                    if (!isCode) {
                        panel.fire('up');
                    }
                }
            }
            else { //向下滚动
                if (isDowning) {
                    isUping = false;
                }
                else {
                    isDowning = true;
                    panel.fire('down');
                }
            }

            recent = height;


            if (height > max) {
                if (!leaved) {
                    leaved = true;
                    panel.fire('leave');
                }
            }
            else if (height == 0) {
                leaved = false;
                panel.fire('top');
            }
            else {
                if (leaved) {
                    leaved = false;
                    panel.fire('return');
                }
            }

           
        });
    });




    panel.on('render', function (is_code) {
        isCode = is_code;
    });


    return panel.wrap({
        'reset': function () {
            recent = 0;         //上次滚动后的 scrollTop 值。
            isUping = false;
            isDowning = false;
            panel.fire('reset');
        },

        //Header 显示/隐藏时，调整 top 距离
        'setTop': function (isHeaderVisible) {
            max = isHeaderVisible ? 67 : 0;
        },
    });
});
