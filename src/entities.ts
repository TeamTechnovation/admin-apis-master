import { tbUser } from "./admin/models/entity/user.entity";
import { tbRBACFeatures } from "./common/models/entity/RBAC_features.entity";
import { tbRightOnFeature } from "./common/models/entity/RightOnFeatures.entity";
import { tbRole } from "./common/models/entity/roles.entity";
import { tbSales } from "./common/models/entity/sales.entity";
import { tbCustomers } from "./customer/models/entity/customer.entity";
import { tbItemsInTransaction } from "./item-receive-dispatch/models/entity/itemsInTransaction.entity";
import { tbTransaction } from "./item-receive-dispatch/models/entity/transaction.entity";
import { tbDayTimeCategory } from "./product/models/entity/dayTimeCategory.entity";
import { tbItemWithQuantity } from "./product/models/entity/itemWithQuantity";
import { tbProduct } from "./product/models/entity/product.entity";
import { tbProductAdon } from "./product/models/entity/productAdOn.entity";
import { tbProductCategory } from "./product/models/entity/productCategory.entity";
import { tbProductGroup } from "./product/models/entity/productGroup.entity";
import { tbProductSize } from "./product/models/entity/productSize.entity";
import { tbProductType } from "./product/models/entity/productType.entity";
import { tbItemBrand } from "./raw-item/models/entity/brand.entity";
import { tbItem } from "./raw-item/models/entity/item.entity";
import { tbItemCategory } from "./raw-item/models/entity/itemCategory.entity";
import { tbItemGroup } from "./raw-item/models/entity/itemGroup.entity";
import { tbUom } from "./raw-item/models/entity/uom.enitity";
import { tbWarehouse } from "./raw-item/models/entity/warehouse.entity";
import { tbWarehouseType } from "./raw-item/models/entity/warehouseType.entity";
import { tbRestaurantArea } from "./restaurant/models/entity/area.entity";
import { tbBooking } from "./restaurant/models/entity/booking.entity";
import { tbRestaurantDocuments } from "./restaurant/models/entity/documents.entity";
import { tbSocialPage } from "./restaurant/models/entity/pages.entity";
import { tbRestaurantFloor } from "./restaurant/models/entity/floor.entity";
import { tbOrders } from "./restaurant/models/entity/orders.entity";
import { tbOutlet } from "./restaurant/models/entity/outlets.entity";
import { tbProductInOrder } from "./restaurant/models/entity/productsInOrder.entity";
import { tbResturant } from "./restaurant/models/entity/restaurant.entity";
import { tbRestaurantRoles } from "./restaurant/models/entity/roles.entity";
import { tbRestaurantSection } from "./restaurant/models/entity/section.entityt";
import { tbTable } from "./restaurant/models/entity/table.entity";
import { tbRestaurantUser } from "./restaurant/models/entity/user.entity";
import { tbOutletStock } from "./stock/models/entity/outlet.entity";
import { tbWarehouseStock } from "./stock/models/entity/warehouse.entity";
import { tbCoupons } from "./subscriptions/models/entity/coupon.entity";
import { tbPaymentGateways } from "./subscriptions/models/entity/paymentGateways.entity";
import { tbSubscription } from "./subscriptions/models/entity/subscriptions.entity";
import { tbThirdPartyIntregrations } from "./subscriptions/models/entity/thirdPartyIntegration.entity";
import { tbItemFromVendor } from "./vendor/models/entity/itemFromVendor.entity";
import { tbVendor } from "./vendor/models/entity/vendor.entity";
import { tbUploadedPosts } from "./restaurant/models/entity/uploadedPosts.entity";
import { tbKot } from "./restaurant/models/entity/kot.entity";
import { tbSubscriptionSales } from "./subscriptions/models/entity/subscriptionSales.entity";
import { tbTempRestaurant } from "./restaurant/models/entity/restaurant.temp.enity";
import { tbStores } from "./aggregators/models/entity/stores.entity";
import { tbProductAndProductType } from "./product/models/entity/product-and-productTypes.entity";

export const entities =[
    tbUser,
    tbRole,
    tbRBACFeatures,
    tbRightOnFeature,
    tbSubscription,
    tbPaymentGateways,
    tbCoupons,      
    tbResturant,
    tbOutlet,
    tbItem,
    tbItemCategory,
    tbItemGroup,
    tbWarehouseType,
    tbWarehouse,
    tbUom,
    tbItemBrand,
    tbThirdPartyIntregrations,
    tbProduct,
    tbProductCategory,
    tbProductGroup,
    tbProductSize,
    tbCustomers,
    tbItemWithQuantity,
    tbSales,
    tbItemFromVendor,
    tbVendor,
    tbTransaction,
    tbItemsInTransaction,
    tbWarehouseStock,
    tbOutletStock,
    tbRestaurantRoles,
    tbRestaurantUser,
    tbRestaurantSection,
    tbRestaurantFloor,
    tbRestaurantArea,
    tbProductAdon,
    tbTable,
    tbBooking,
    tbDayTimeCategory,
    tbRestaurantDocuments,
    tbProductType,
    tbOrders,
    tbProductInOrder,
    tbSocialPage,
    tbUploadedPosts,
    tbKot,
    tbSubscriptionSales,
    tbTempRestaurant,
    tbStores,
    tbProductAndProductType
]