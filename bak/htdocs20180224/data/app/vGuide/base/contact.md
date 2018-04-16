##客户的联系人列表 GetContactByCst
获取某个客户的联系人列表，`微CRM接口`。



用途：确认订单时选择联系人，微CRM。

**参数：**

名称 |  描述
------ | ------
`cstid` | 客户id
`isinclude` | 是否包含客户资料里的联系人，isinclude=1


**返回值：**
如果有主联系人，则为第一条数据。
``` json
{
	"contact":[
		{
		"id":"联系人guid",
		"name":"联系人名称",
		"phone":"电话",
		"desc":"部门/职位"

		}
	]
}
```

没有数据：
``` json
{
	"contact":[]
}
```
