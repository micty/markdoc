##客户联系人的收货地址列表 GetAddressList
获取某个联系人的收货地址列表。

用途：确认订单时选择收货地址、发票地址。

**参数：**

名称 |  描述
------ | ------
`contactId` | 联系人guid


**返回值：**
如果有默认地址则为第一条数据。
``` json
{
	"address":[
		{
		"id":"地址guid",
		"desc":"地址详情(完整地址)",
		"addr":"街道地址",
		"name":"收货人",
		"phone":"电话",
		"province":"省",
		"city":"市",
		"district":"区",
		"provinceCode":"省编码",
		"cityCode":"市编码",
		"districtCode":"区编码",
		"isDefault":"是否默认地址（1默认；0非默认）",

		}
	]
}
```
没有数据：
``` json
{
	"address":[]
}
```
