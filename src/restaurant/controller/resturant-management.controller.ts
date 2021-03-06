import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { tbRestaurantArea } from '../models/entity/area.entity';
import { tbRestaurantFloor } from '../models/entity/floor.entity';
import { tbRestaurantSection } from '../models/entity/section.entityt';
import { ResturantManagementService } from '../service/resturant-management.service';

@Controller('management')
export class ResturantManagementController {
    constructor(
        private readonly resturantManagement: ResturantManagementService,
       
    ) {}
    @Post("floor")
    async createFloor(@Body() floor: tbRestaurantFloor):Promise<tbRestaurantFloor>{
        console.log(floor)
        return await this.resturantManagement.createRestaurantFloor(floor)
    } 

    @Post("area")
    async createArea(@Body() area: tbRestaurantArea):Promise<tbRestaurantArea>{
        return await this.resturantManagement.createRestaurantArea(area)
    } 

    @Post("section")
    async createSection(@Body() section: tbRestaurantSection):Promise<tbRestaurantSection>{
        return await this.resturantManagement.createRestaurantScetion(section)
    }

    @Post("get/section")
    getAllSectionOfAllAreas(@Body() section: any) {
        return this.resturantManagement.getSectionofAllArea(section);
    }

    @Get("floor/restaurant/:restaurantId")
    async getAllFloor(@Param("restaurantId") restaurantId: number) {
        return await this.resturantManagement.getAllFloor(restaurantId)
    }

    @Get("floor/outlet/:outletId")
    async getAllFloorByOutlet(@Param("outletId") outletId: number) {
        return await this.resturantManagement.getAllFloorByOutlet(outletId)
    }

    @Get("area/:floorId")
    async getAllArea(@Param("floorId") floorId: number) {
        return await this.resturantManagement.getAllArea(floorId)
    }

    @Get("section/:areaId")
    async getAllSection(@Param("areaId") areaId: number) {
        return await this.resturantManagement.getAllSection(areaId)
    }

    @Put(":floorId/area")
    async updateArea(@Param("floorId") floorId: number, area: tbRestaurantArea): Promise<Boolean> {
        return (await this.resturantManagement.updateArea(floorId,area)).affected > 0
    }

    @Post("allocate/product.type/floor")
    async allocateFloor(@Body() body: any) {
        return await this.resturantManagement.allocateProductTypeOnFloor(body);
    }

    @Post("allocate/product.type/area")
    async allocateArea(@Body() body: any) {
        return await this.resturantManagement.allocateProductTypeOnArea(body);
    }

    @Post("allocate/product.type/section")
    async allocateSection(@Body() body: any) {
        return await this.resturantManagement.allocateProductTypeOnSection(body);
    }

    @Get("product.type/floor/:floorId")
    async getProductTypeByFloor(@Param("floorId") floorId: number) {
        return await this.resturantManagement.getProductTypeOnFloor(floorId)
    }

    @Get("product.type/area/:areaId")
    async getProductTypeByArea(@Param("areaId") areaId: number) {
        return await this.resturantManagement.getProductTypeOnArea(areaId)
    }

    @Get("product.type/section/:sectionId")
    async getProductTypeBySection(@Param("sectionId") sectionId: number) {
        return await this.resturantManagement.getProductTypeOnSection(sectionId)
    }

    @Get("tables/floor/:floorId")
    getTablesByFloor(@Param("floorId") floorId: number) {
        return this.resturantManagement.getTablesByFloor(floorId)
    }

    @Get("tables/area/:areaId")
    getTablesByArea(@Param("areaId") areaId: number) {
        return this.resturantManagement.getTablesByArea(areaId)
    }

    @Get("tables/section/:sectionId")
    getTablesBySection(@Param("sectionId") sectionId: number) {
        return this.resturantManagement.getTablesBySection(sectionId)
    }

    @Post("section/tables")
    createTables(@Body() body: any) {
        return this.resturantManagement.updateTablesForSection(body)
    }

    @Delete("section/delete/:sectionId")
    deleteSection(@Param("sectionId") sectionId: number) {
        return this.resturantManagement.deleteSection(sectionId)
    }
}