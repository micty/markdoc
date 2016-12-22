##商品库存 GetProductStock
获取某个商品sku的库存信息，针对的有辅助属性的商品和合并商品。


用途：商品详情选择属性或者商品时调用刷新库存。

**参数：**

名称 |  描述
------ | ------
`productId` | 商品id（辅助属性的商品）/合并商品主id：`商品列表里的id`
`itemId` | 属性id（辅助属性的商品）/商品id（合并商品）：`商品信息rulelist里的id`
`type` | 商品类型：商品信息里的type
`subId` | 仓库id：int类型，没有值可以不传或则为0，`不能为空串`
`empId` | 职员id(GetUserInfo里的id)


**返回值：**
``` json
{
	"qty":"数量"
}
```

