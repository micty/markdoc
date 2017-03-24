
define('/Scroller', function (require, module, exports) {

    var $ = require('$');
    var MiniQuery = require('MiniQuery');


    var KISP = require('KISP');
    var panel = KISP.create('Panel');
    

       
    var isUping = false;
    var isDowning = false;
    var isCode = false;
    var max = 67;

    var recent = {
        x: 0,
        y: 0,        //上次滚动后的 scrollTop 值。
    };



    panel.on('init', function () {

        var leaved = false;

        $(window).on('scroll', function (event) {
            var x = document.body.scrollLeft;
            var y = document.body.scrollTop;

            var dx = x - recent.x;
            var dy = y - recent.y;

            recent.x = x;

            if (dx != 0) {
                panel.fire('x', [x]);
            }


            //在快速向上滚动过程中，有时会产生向下滚动的 1px 的情况。
            if (Math.abs(dy) <= 1) {
                if (y == 0) {
                    panel.fire('top');
                }

                return;
            }
          

            //向上滚动
            if (dy < 0) {
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

            recent.y = y;


            if (y > max) {
                if (!leaved) {
                    leaved = true;
                    panel.fire('leave');
                }
            }
            else if (y == 0) {
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
            recent.y = 0;         //上次滚动后的 scrollTop 值。
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
