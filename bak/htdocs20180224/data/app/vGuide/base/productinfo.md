##商品信息 GetProductInfo
获取商品详情。需要注意的是不同的商品类型，返回的数据结构有所不同。


用途：选择商品点击入购物车时，展现商品信息。

**参数：**

名称 |  描述
------| ------
`productId` | 商品id(商品列表返回的id)
`customerId` | 客户id
`empId` | 职员id（用户id）

**返回结构说明：**

产品类型\返回值 |type|price|image|class|rule|ruleList
------| ------
`普通商品` |有|有|有|无|有|无
`合并商品` |有|无|有|无|无|有
`属性商品` |有|无|有|有|有|有
****
产品类型\ruleList |id|value|price|image|rule
------| ------
`合并商品` |有|有,商品名称|有|有|有
`属性商品` |有|有，属性拼接串|有|有|有

**返回值：**
``` json
{	
	"id":"商品id(商品列表返回的id)",
	"type":"商品类型：0：普通商品，1：合并商品，2：有辅助属性商品",
	"qtyDecimal":"数量精度",
	"priceDecimal":"价格精度",
	"isBatchMsg": "商品是否启用批号管理：1启用，0没启用",
	"price":"商品价格",
	"image":"图片,没有值只取列表图片：普通商品时没有值",
	"barCode":"条形码",
	"class":[{"name":"属性类别名"}],
	"rule":[
		{
			"min":"数量最小值",
			"max":"数量最大值",
			"price":"商品价格",
			"unitId":"单位id",
			"isLowPrice":"是否最低价控制：1控制，0不控制",
			"lowPrice":"最低限格"			
		}
	],
	"ruleList":[
		{
			"id":"属性id/商品id",		
			"value":"属性值(type=2时为数组)",
			"price":"价格",
			"image":"图片",
			"rule":[
			   {
				"min":"数量最小值",
				"max":"数量最大值",
				"price":"商品价格",
				"unitId":"单位id",
				"isLowPrice":"是否最低价控制：1控制，0不控制",
				"lowPrice":"最低限格"				
			   }
			]
		}
	],
}
```

**例子1：有辅助属性商品**

1.属性类class对应的项通过ruleList里的value值获取。class最多两大类，第一类对应value里的第一种。
如例子：码数分为S和M；S分白色和黑色，M只有白色。

2.价格规则：先在ruleList里找到对应的rule：
1）根据实际数量在最小值min和最大值max里就取价格price；
2）如果没有找到对应的rule，就取price；
3）如果没有rule，就取最外层的rule,最外层也没有就取ruleList里的price。

``` json
{
    "id":"13213",
    "type": 2,
"qtyDecimal":"6",
    "image": "",
    "class": [
        {
            "name": "码数"
        },
        {
            "name": "颜色"
        }
    ],
    "rule": [
        {
            "min": 0,
            "max": 10,
            "price": 20
        }
    ],
    "ruleList": [
        {
            "id": "10",
            "value": ["S","白色"],
	    "price": 100,
	    "image": "",
            "rule": [
                {
                    "min": 0,
                    "max": 0,
                    "price": 0
                }
            ]
        },
        {
            "id": "11",
            "value": ["M","白色"],
	    "price": 101,
	    "image": "",
            "rule": [
                {
                    "min": 0,
                    "max": 10,
                    "price": 110
                },
                {
                    "min": 11,
                    "max": 100,
                    "price": 100
                }
            ]
        },
        {
            "id": "12",
            "value": ["S","黑色"],
	    "price": 101,
	    "image": "",
            "rule": [
                {
                    "min": 0,
                    "max": 0,
                    "price": 0
                }
            ]
        }
    ]
}
```
**例子2：合并商品**

``` json
{
    "id":"2AB5F9173E604D6395B3B440EB584E66",
    "type": 1,
    "image": "",
    "ruleList": [
        {           
            "id": "985",
		    "value": "16G版 4G手机（金色）kmlk",
"qtyDecimal":"6",
		"price": 10.01,
		    "image": "http://mob.cmcloud.cn/KISCloud/AttachDownload.ashx?G3=513934&AppID=S1S011S001&FType=1&FCode=yadda_20150630162616430876",     
            "rule": [
                {
                    "min": 0,
				    "max": 10,
                    "price": 10                
                },
		{
                    "min": 11,
				    "max": 20,
                    "price": 10                
                }
            ],            
        },
        {
            "id": "996",
		    "value": "金色 （1210万像素 21mm广角 自拍神器",
"qtyDecimal":"4",
		"price": 10.01,
            "image": "http://mob.cmcloud.cn/KISCloud/AttachDownload.ashx?G3=513934&AppID=S1S011S001&FType=1&FCode=yadda_20150630162633973554",
            "rule": [
                {
                    "min": 0,
				    "max": 0,
                    "price": 0                   
                }
            ]
            
        }
    ]
}
```
**例子3：普通商品**

``` json
{
    "id":"13213",
    "type": 0,
"qtyDecimal":"6",
    "price": 1010,
    "image": "",
    "rule": [
        {
            "min": 0,
            "max": 0,
            "price": 0
        }
    ]
}
```