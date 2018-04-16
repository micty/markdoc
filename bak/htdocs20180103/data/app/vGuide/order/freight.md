##运费 GetFreight
计算运费。


用途：提交订单时，显示运费。

**参数：**

名称 |  描述
------| ------
`addrId` | 地址id(字符串)`没有地址，传空串` 
`products` | 商品列表（数组）

**products参数说明：**

名称 |  描述
------| ------
`id` | 商品id
`price` | 商品价格
`qty` | 商品数量

**商品id及参数productId说明：**

产品类型|主id（商品列表的id）|明细id（商品信息rulelist里的id）|`id` 
------| ------
`普通商品` |有，商品id|无|主id
`合并商品` |有，合并商品id|有，商品id|明细id
`属性商品` |有，商品id|有，属性id|主id


**返回值：**
``` json
{	
	"freight":"运费"
}
```


**参数例子**


``` json
{
    "addrId": "",
    "products": [
        {
            "id": "623",
            "price": 0.01,
            "qty": 3
        },
        {
            "id": "921",
            "price": 75,
            "qty": 2
        },
        {
            "id": "999",
            "price": 50,
            "qty": 1
        },
        {
            "id": "999",
            "price": 100,
            "qty": 1
        }
    ]
}
```
