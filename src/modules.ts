import { AdminModule } from "./admin/admin.module";
import { AggregatorsModule } from "./aggregators/aggregators.module";
import { AuthModule } from "./auth/auth.module";
import { CommonModule } from "./common/common.module";
import { CustomerModule } from "./customer/customer.module";
import { ItemReceiveDispatchModule } from "./item-receive-dispatch/item-receive-dispatch.module";
import { ProductModule } from "./product/product.module";
import { RawItemModule } from "./raw-item/rawItem.module";
import { RestaurantModule } from "./restaurant/restaurant.module";
import { StockModule } from "./stock/stock.module";
import { SubscriptionsModule } from "./subscriptions/subscriptions.module";
import { VendorModule } from "./vendor/vendor.module";

export const modules = [
    AdminModule,
    CommonModule,
    SubscriptionsModule,
    RestaurantModule,
    RawItemModule,
    AuthModule,
    ProductModule,
    CustomerModule,
    VendorModule,
    ItemReceiveDispatchModule,
    StockModule,
    AggregatorsModule
]