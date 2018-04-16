##提交收款单 SubmitReceipt
保存收款单(新增)。


用途：订单，点收款按钮。

**参数：**

名称 |  描述
------| ------
`customerId` | 客户id：int类型
`empId` | 职员id（用户id）
`amount` | 收款金额
`orderNo` | 订单单据编号
`orderId` | 订单id
`contactId` | 联系人id
`payWXNo` | 微信/支付宝流水号
`settlementId` | 结算方式id
`settlementNo` | 结算方式代码
`note` | 收款备注



**返回值：**
``` json
{			
	"billNo":"收款单编号",
	
}
```


