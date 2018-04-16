##提交订单 SubmitOrder
保存订单(新增)。要适用于修改订单，需修改地址参数，不能传id，需要传具体的值。FReceiverID收货地址id。


用途：提交订单，点提交按钮。

**参数：**

名称 |  描述
------| ------
`customerId` | 客户id：int类型（必填）
`contactId` | 联系人id（必填）
`empId` | 职员id（用户id）（必填）
`salesman` | 业务员id，默认值同empId（必填）
`orderId` | 订单id（考虑修改状态，新增时为0）
`note` | 摘要
`addrId` | 收货地址id 
`provinceCode` | 收货地址省编码 
`cityCode` | 收货地址市编码
`districtCode` | 收货地址区编码
`addr` | 收货地址的街道地址
`addrName` | 收货人
`addrPhone` | 收货电话
`date` | 交货日期`(废弃)，后台自动取订单日期`
`isFreight` | 是否送货（bool）（true：快递送货；false：门店自提,对应数据库FOutInStore，只区分是否自提）
`freight` | 运费
`isInvoice` | 是否开发票（bool）
`invoiceName` | 发票抬头
`invoiceAddr` | 发票收寄地址（完整地址）
`invoicePerson` | 发票收寄人
`invoicePhone` | 发票收寄电话
`detail` | 订单明细（数组） 
`settlementId`| 结算方式id(int，没有值时最好传-1)
`deliveryId` | 交货方式id(string，没有值时不传或者传空串)


**detail参数说明：**

名称 |  描述
------| ------
`productId` | 商品id（合并商品取明细id）
`itemId` | 属性id
`price` | 商品价格
`qty` | 商品数量
`unitId` | 单位 
`note` | 备注 



**返回值：**
``` json
{		
	"billId":"订单id（成功）",
	"billNo":"订单编号（成功）",
	"products":[
		{
			"productId":"商品id",
			"itemId":"属性id",
			"name":"产品名称",
			"unit":"单位名称",
			"qty":"库存数量"
		}
	]

}
```
注意：products:库存不通过的商品组（不成功）。

**参数例子**


``` json
{
	"customerId": 10,
     	"empId": 22,
        "orderId": 0,
	"contactId": "B568772F-292C-443F-B679-A47A58AB04A6",
        "note": "",
        "addrId": "B568772F-292C-443F-B679-A47A58AB04A6",
	"invoiceAddrId":"",
        "date": "",
        "isFreight": true,
        "isInvoice": true,
        "InvoiceName": "济南分公司",
        "detail": [
            {
                "productId": "999",
                "itemId": "12",
                "qty": 1,
                "price": 100,
                "unitId": 777,
            },
            {
                "productId": "999",
                "itemId": "10",
                "qty": 1,
                "price": 50,
                "unitId": 777,
            },
            {
                "productId": "921",
                "itemId": 0,
                "qty": 2,
                "price": 75,
                "unitId": 777,
            },
            {
                "productId": "924",
                "itemId": 0,
                "qty": 4,
                "price": 75,
                "unitId": 777,
            },
            {
                "productId": "623",
                "itemId": 0,
                "qty": 3,
                "price": 0.01,
                "unitId": 241,
            }
        ]
}
```
