##订单详情 GetGuideOrderDetail
导购中查看订单详情。

**参数：**

名称 |  描述
------| ------
`orderId` | 订单id


**返回值：**
``` json
{	
	"order":{
		"id":"订单id",
		"no":"订单编号",
		"date":"单据日期",
		"note":"备注",
		"status":"分享状态(数字类型)，0：待分享，1：已分享，2：无分享状态",
		"freight":"运费",
		"settlement":"结算方式",
		"deliveryWay":"交货方式",
		"settlementId":"结算方式Id",
		"deliveryWayId":"交货方式Id",
		"salesmanId":"业务员Id",
		"salesman":"业务员"
	},
	"customer":{
		"id":"客户id",
		"name":"客户名称"
	},
         "contact":{
		"id":"联系人id",
		"name":"联系人名称",
		"phone":"联系人电话"
	},
	"invoice":{
		"isInvoice":"是否开票",
		"head":"发票抬头",
            	"desc": "地址详情",
            	"name": "收货人",
            	"phone": "电话"
	},

	"address": {
		"isFreight":"是否送货（isFreight=1：快递送货；=0：门店自提,对应数据库FOutInStore，只区分是否自提）",
		"sendWayId":"送货方式id（门店自提：1，门店配送：2；对应数据库FSendWayID）",
            	"desc": "地址详情",
            	"name": "收货人",
            	"phone": "电话",
		"addrId": "地址id",
            	"provinceCode": "省编码",
		"cityCode": "市编码",
            	"districtCode": "区编码",
		"addr": "街道地址",
	},
	"products": [
		{
            	 "id": "商品id",
           	 "name": "商品名称",
           	 "image": "图片",
		 "itemId": "属性id/商品id（合并商品）",
           	 "value": "属性名称（数组，没有为null）",
           	 "qty": "属性数量/商品数量",
           	 "price": "属性金额/商品金额(单价)",
		 "type": "商品类型：0：普通商品，1：合并商品，2：有辅助属性商品",
           	 "unit": "单位",
		 "unitId": "单位id",
		 "rate":"换算率，按销售单位换算（不是基本单位换算）",
		 "model": "规格",
		 "qtyDecimal": "商品数量精度",
		 "priceDecimal":"价格精度",
		 "isBatchMsg": "商品是否启用批号管理：1启用，0没启用",
		 "note":"备注",
		 "barCode":"条形码"
		}
	],
"date":"交货日期",
"isReceived":"是否收款:1为收款，0为未收款"

}
```


**参数例子**


``` json
{

    
}
```
