##商品列表 GetProductList
获取微商城商品列表。


用途：按类目展现商品列表。

**参数：**

名称 |  描述
------| ------
`key` | 搜索关键字（isBarCode=false:商品名称\代码\规格\助记码；isBarCode=true：条形码）
`type` | 商品类别/类目id：0、-1都是有意义的值，没有类别是传空串（特殊处理：当选择未上架分类及子类时，都传未上架id:-1）
`customerId` | 客户id：int类型，没有值可以不传或则为0，`不能为空串`
`empId` | 职员id（用户id）
`isBarCode` | 是否扫码（true:key为条形码）
`code` | 类目代码（未上架商品取code进行过滤；“全部”传上级的code）
`废categoryId` | （废）未上架类别的明细类别（未上架->全部为-1，其他为对应的类别id；当type=-1时，必录；其他显示可同type（无用）(int,不能为空串，搜索时传0)）
`type=空串时，商品列表不过滤类目,key必须有值`

**返回值：**
``` json
{
	"list":[
		{		
		"id":"商品id",
		"code":"商品代码",
		"name":"商品名称",
		"model":"规格型号",
		"type":"商品类型：0：普通商品，1：合并商品，2：有辅助属性商品",
		"unit":"单位",
		"unitId":"单位id",
		"image":"图片url",
		"qty":"数量",
		"price":"商品价格或则价格范围最小值：maxprice>0且price!=maxPrice时为价格范围",
		"maxPrice":"价格范围最大值:maxPrice>0且price!=maxPrice时有用",
		"onsale":"是否上架:上架true；未上架false",
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