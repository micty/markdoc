﻿##获取当前用户信息 GetUserInfo1
获取当前用户信息，同微客户的GetUserInfo2，只是增加了价格参数。

用途：微销售。

**参数：**

（无）


**返回值：**
价格参数部分说明
``` json
{
	"pricePara":"int类型；0：不可以修改价格；1：可以修改价格；2：可以修改价格，且给予提示",	
	"lowPricePara":"int类型；0：不可以低于最低价格；1：可以低于最低价格；2：可以低于最低价格，且给予提示",	
	"isShowPic":"微销售是否显示图片：1显示，0不显示",
	"batchNo":"出库批号设置：0系统随机获取批号、1手动选择批号",	
	"receiptRight":"允许收款(true:有权限；false：没有权限)",	
}
```
