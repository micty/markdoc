##获取批号列表 GetBatchNoList
获取指定商品仓库的批号。

用途：系统设置手动选择批号、并且商品启用批号时，提供选择。

**参数：**

名称 |  描述
------ | ------
`productId` | 商品id（合并商品取明细id）
`itemId` | 属性id(不是属性商品传0)
`warehouseId` | 仓库id（没有选择仓库传0）
`placeId` | 仓位id（没有仓位传0）


**返回值：**
``` json
{
	"list":[
		{
		"batchNo":"批号",
		"qty":"即时库存",
		}
	]
}
```

