﻿##获取仓库和仓位 GetStockAndPlace
获取系统所有仓库，包括仓位。

用途：销售出库单选择商品出库仓及仓位。

**参数：**

名称 |  描述
------ | ------
`empId` | 职员id(GetUserInfo里的id)

**返回值：**
``` json
{
	"stock":[
		{
		"id":"仓库id",
		"name":"仓库名称",
		"isPlace":"是否进行仓位管理;1：有仓位，0：没有",
		"placeGroupId":"仓位组id",
		}
	]，
	"仓位组1id":[
		{
		"id":"仓位id",
		"name":"仓位名称",
		}
	]，
	"仓位组2id":[
		{
		"id":"仓位id",
		"name":"仓位名称",
		}
	]，
}
```
没有数据：
``` json
{
	"list":[]
}
```
