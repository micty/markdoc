
KISP.panel('/Scroller', function (require, module, panel) {
    const $ = require('$');

    let isUping = false;
    let isDowning = false;
    let isCode = false;
    let max = 67;

    let recent = {
        x: 0,
        y: 0,        //上次滚动后的 scrollTop 值。
    };




    panel.on('init', function () {

        let leaved = false;

        $(window).on('scroll', function (event) {
            //let x = document.body.scrollLeft;
            //let y = document.body.scrollTop; //突然失效了，未找到原因。 改用下面的 window.scrollY。

            let x = window.scrollX;
            let y = window.scrollY;

            let dx = x - recent.x;
            let dy = y - recent.y;

            recent.x = x;

            if (dx != 0) {
                panel.fire('x', [x]);
            }


            //在快速向上滚动过程中，有时会产生向下滚动的 1px 的情况。
            if (Math.abs(dy) <= 1) {
                if (y == 0) {
                    console.log('window.scrollY', window.scrollY);
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





    return {
        reset: function () {
            recent.y = 0;         //上次滚动后的 scrollTop 值。
            isUping = false;
            isDowning = false;
            panel.fire('reset');
        },

        //Header 显示/隐藏时，调整 top 距离
        setTop: function (isHeaderVisible) {
            max = isHeaderVisible ? 67 : 0;
        },
    };
});
