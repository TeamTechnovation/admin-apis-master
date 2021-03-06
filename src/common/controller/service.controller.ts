import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CommonService } from "../service/common.service";

@Controller("service")
export class ServiceController {
    constructor(
        private readonly commonService: CommonService
    ) { }

    @Post('upload.docs/:createdUsing')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: any, @Param("createdUsing") createdUsing: number) {
        return this.commonService.uploadFiles(file,createdUsing)
    }
    
    @Post("create-order")
    createOrder(@Body() body: any) {
        return this.commonService.createOrder(body)
    }

    @Put("pay-order/:salesId/:paymentId")
    payOrder(@Param("salesId") salesId: string, @Param("paymentId") paymentId: string) {
        return this.commonService.payOrder(salesId, paymentId)
    }
}