
#H5终将改变互联网世界


![](upload/paste/2018-04-03/171321-8F9C.png)





```js

    //需要保持为代码模式展示的。 
    var exts = ['.json', '.js', '.css', ];

    panel.on('init', function () {
        markdoc = new MarkDoc({
            container: $div.get(0),

        });

        markdoc.on('hash', function (href) {
            panel.fire('hash', [href]);
        });

        panel.$.on('scroll', function (event) {
            if (passive) {
                passive = false;
                return;
            }

            var height = $div.outerHeight();
            var top = panel.$.get(0).scrollTop;

            panel.fire('scroll', [{
                'height': height,
                'top': top,
            }]);

        });
    });
    
```
![](upload/paste/2018-04-03/171953-6FC6.png)

![](upload/paste/2018-04-03/172003-161B.png)
![](upload/paste/2018-04-03/171505-6ADC.png)

