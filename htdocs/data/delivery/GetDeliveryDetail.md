##出库单详情 GetDeliveryDetail
微销售中查看出库单详情。

**参数：**

名称 |  描述
------| ------
`billId` | 单据id


**返回值：**
``` json
{	
	"delivery":{
		"id":"单据id",
		"no":"编号",
		"date":"单据日期",
		"note":"备注",
		"settleDate":"收款日期",
		"salesmanId":"业务员Id",
		"salesman":"业务员",
		"fManagerId":"发货人Id",
		"fManager":"发货人",
		"sManagerId":"保管人Id",
		"sManager":"保管人"
	},
	"customer":{
		"id":"客户id",
		"name":"客户名称"
	},
	"address": {
            	"desc": "地址详情",
            	"name": "收货人",
            	"phone": "电话",
            	"province": "省",
		"city": "市",
            	"district": "区",
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
		 "warehouseId": "仓库id",
		 "warehouse": "仓库",
		 "batchNo": "批号",
		 "barCode":"条形码"
		}
	],

}
```


**参数例子**


``` json
{
    
}
```
