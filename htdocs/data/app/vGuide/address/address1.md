##客户的收货地址列表 GetAddressListByCst
获取某个客户所有的收货地址列表。

用途：确认出库单时选择收货地址。

**参数：**

名称 |  描述
------ | ------
`customerId` | 客户id


**返回值：**

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
		"contactId":"联系人id",
		"contactName":"联系人名称",
		"isDefault":"是否默认地址（1默认；0非默认）",

		}
	]
}
```

