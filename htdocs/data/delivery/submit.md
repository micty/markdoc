##提交出库单 SubmitDelivery
保存出库单(新增)。


用途：提交出库单订单，点提交按钮。

**参数：**

名称 |  描述
------| ------
`customerId` | 客户id：int类型（必填）
`empId` | 职员id（用户id）（必填）
`salesman` | 业务员id，默认值同empId（必填）
`fManagerId` | 发货人id（必填）
`sManagerId` | 保管人id（必填）
`billId` | 单据id（考虑修改状态，新增时为0）
`note` | 备注
`province` | 收货地址省
`city` | 收货地址市
`district` | 收货地址区
`addr` | 收货地址的街道地址
`addrName` | 收货人
`addrPhone` | 收货电话
`date` | 收款日期日期`(必填)，默认当前日期`
`detail` | 单据明细（数组） 


**detail参数说明：**

名称 |  描述
------| ------
`productId` | 商品id（合并商品取明细id）
`itemId` | 属性id
`price` | 商品价格
`qty` | 商品数量
`unitId` | 单位 
`warehouseId` | 仓库id 
`placeId` | 仓位id 
`isBatchMsg` | 是否启动批号管理 
`batchNo` | 批号（参数是选择批号且启动了批号管理、必录）



**返回值：**
``` json
{		
	"billId":"出库单id",
	"billNo":"出库单编号",
	
}
```


