导购接口说明文档
==============================================================
--------------------------------------------------------------

###简介 

> 导购应用归属于微CRM，与微CRM共用同一个后台服务。主要有两部分功能：代客下单和产品名片。本文档主要是代客下单部分接口说明，产品名片在微CRM文档里说明。

###商品（基础资料）
- [客户列表](?file=./base/customer.md)
- [类目列表](?file=./base/type.md)
- [商品列表](?file=./base/productlist.md)
- [商品信息GetProductInfo](?file=./base/productinfo.md)
- [商品库存](?file=./base/stock.md)
- [商品价格策略列表GetPriceList](?file=./base/pricelist.md)
- [商品价格策略列表old](?file=./base/pricelist0.md)
- [联系人](?file=./base/contact.md)
- [仓库GetWarehouse](?file=./base/warehouse1.md)
- [仓库含仓位GetStockAndPlace](?file=./base/warehouse2.md)
- [商品对应的单位列表GetUnitListById](?file=./base/GetUnitListById.md)

### 收货地址
- [收货地址(订单)(GetAddressList)](?file=./address/address2.md)
- [收货地址(出库单)(GetAddressListByCst)](?file=./address/address1.md)
- [保存收货地址(SaveAddress)](?file=./address/SaveAddress.md)
- [删除收货地址(DeleteAddress)](?file=./address/DeleteAddress.md)
- [设置默认收货地址(SetDefaultAddress)](?file=./address/SetDefaultAddress.md)

### 订单
- [运费](?file=./order/freight.md)
- [提交订单](?file=./order/submit.md)
- [订单列表(old)(废)](?file=./order/list1.md)
- [订单列表(new)(废)](?file=./order/list2.md)
- [设置订单分享状态](?file=./order/share.md)
- [订单详情GetGuideOrderDetail](?file=./order/detail.md)
- [购物车](?file=./order/cart.md)
- [结算方式](?file=./order/settlement.md)
- [交货方式](?file=./order/deliveryWay.md)
- [发送发货通知短信息](?file=./order/SendDeliveryMsg.md)
- [取消订单](?file=./order/DeleteOrderById.md)
- [作废订单](?file=./order/CancelOrderById.md)

###其他
- [获取用户信息GetUserInfo1](?file=./other/GetUserInfo1.md)
- [获取微商城地址GetWDHUrl](?file=./other/GetWDHUrl.md)

### 销售出库
- [提交出库单](?file=./delivery/submit.md)
- [获取出库单详情(GetDeliveryDetail)](?file=./delivery/GetDeliveryDetail.md)
- [获取出库单状态流(GetDeliveryStatus)](?file=./delivery/GetDeliveryStatus.md)
- [获取批号(GetBatchNoList)](?file=./delivery/GetBatchNoList.md)

###列表
- [获取列表(订单和出库单)GetGuideList](?file=./other/list.md)

### 收款
- [提交收款单SubmitReceipt](?file=./receipt/SubmitReceipt.md)
- [获取收款单的结算方式GetReceiptSettlement](?file=./receipt/GetReceiptSettlement.md)
- [获取收款单编号GetReceiptCodeByOrder](?file=./receipt/GetReceiptCodeByOrder.md)