﻿##客户列表 GetCustomerList
获取该职员权限范围内的所有正式客户。

1、客户如果未指定【专营业务员】，又未指定【分管部门】，则所有人都可以看到该客户；

2、客户如果未指定【专营业务员】，但指定了【分管部门】，则分管部门的所有人可以看到该客户；

3、客户如果指定了【专营业务员】，则只有专营业务员和对应主管可以看到。


用途：导购所有选择客户的地方。

**参数：**

名称 |  描述
------ | ------
`empId` | 职员id（用户id）
`depId` | 部门id
`key` | 搜索关键字（名称或者代码）


**返回值：**
``` json
{
	"list":[
		{
		"name":"客户名称",
		"id":"客户id",
		"code":"客户代码"
		}
	]
}
```
没有数据：
``` json
{
	"list":[]
}
```
