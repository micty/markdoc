##获取出库单状态流 GetDeliveryStatus
获取出库单状态流(同订单状态流)。


用途：查看出库单状态流。

**参数：**

名称 |  描述
------| ------
`billId` | 单据id


**返回值：**
``` json
{		
	"statuslist":[
		{
			"status":"订单状态，eg：[提交订单]",
			"date":"日期",
			"operator":"操作员",
		}
	],
	"stocklist":[
		{
			"company":"快递公司",
			"express":"快递号",
			"mobile":"电话号码",
			"name":"发货人",
		}
	]

}
```


