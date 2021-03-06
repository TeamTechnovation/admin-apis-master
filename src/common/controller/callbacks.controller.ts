import { Body, Controller, Post } from "@nestjs/common";
import { CommonService } from "../service/common.service";

@Controller("callback")
export class CallbackController {
    constructor(
        private readonly commonService: CommonService
    ) { }

    @Post("store.created")
    storeCreated(@Body() body: any) {
        console.log(JSON.stringify(body))
        if (body.stats.created > 0) {
            this.commonService.activateStore(body.reference)
        } else if(body.stats.updated > 0) {
            this.commonService.inActiveStore(body.stores[0].ref_id)
        }
        else {
            //TODO: Notify User that store is not created by urban piper
        }
    }

    @Post("order.placed")
    orderReceived(@Body() body: any) {
        console.log(body)
    }
}