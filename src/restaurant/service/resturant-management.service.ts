import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, In, Repository, UpdateResult } from 'typeorm';
import { tbRestaurantArea } from '../models/entity/area.entity';
import { tbRestaurantFloor } from '../models/entity/floor.entity';
import { tbRestaurantSection } from '../models/entity/section.entityt';
import { tbTable } from '../models/entity/table.entity';

@Injectable()
export class ResturantManagementService {
    constructor(
        @InjectRepository(tbRestaurantArea)
        private readonly restaurantAreaRepository: Repository<tbRestaurantArea>,
        @InjectRepository(tbRestaurantFloor)
        private readonly retaurantFloorRepo: Repository<tbRestaurantFloor>,
        @InjectRepository(tbRestaurantSection)
        private readonly restaurantSectionRepo: Repository<tbRestaurantSection>,
        @InjectRepository(tbTable)
        private readonly tablesRepo: Repository<tbTable>
    ) { }

    async createRestaurantFloor(floor: tbRestaurantFloor) {
        return await this.retaurantFloorRepo.save(floor)
    }
    async createRestaurantArea(area: tbRestaurantArea) {
        return await this.restaurantAreaRepository.save(area)
    }
    async createRestaurantScetion(section: tbRestaurantSection) {
        return await this.restaurantSectionRepo.save(section)
    }
    async getAllFloor(restaurantId: number): Promise<tbRestaurantFloor[]> {
        return await this.retaurantFloorRepo.find({
            where: {
                restaurant: restaurantId
            },
        });
    }
    async getAllFloorByOutlet(outletId: number) {
        return await this.retaurantFloorRepo.find({
            where: {
                outlet: outletId
            },
        });
    }
    async getAllArea(floorId: number): Promise<tbRestaurantArea[]> {
        return await this.restaurantAreaRepository.find({
            where: {
                floor: floorId
            },
        });
    }
    async getAllSection(areaId: number): Promise<tbRestaurantSection[]> {
        return await this.restaurantSectionRepo.find({
            where: {
                area: areaId
            },

        });
    }
    async getSectionofAllArea(body: any) {
        // console.log(await this.restaurantSectionRepo.find())
        // return await this.restaurantSectionRepo.find({
        //     where: {
        //         area: 2
        //     },
        // })
    }
    async updateArea(id: number, area: tbRestaurantArea): Promise<UpdateResult> {
        return await this.restaurantAreaRepository.update(id, { ...area });
    }
    async allocateProductTypeOnFloor(body: any) {
        return await getConnection()
            .createQueryBuilder()
            .relation(tbRestaurantFloor, "productTypes")
            .of(body.floorId)
            .addAndRemove(body.added, body.remove)
    }
    async allocateProductTypeOnArea(body: any) {
        return await getConnection()
            .createQueryBuilder()
            .relation(tbRestaurantArea, "productTypes")
            .of(body.areaId)
            .addAndRemove(body.added, body.remove)
    }
    async allocateProductTypeOnSection(body: any) {
        return await getConnection()
            .createQueryBuilder()
            .relation(tbRestaurantSection, "productTypes")
            .of(body.sectionId)
            .addAndRemove(body.added, body.remove)
    }
    async getProductTypeOnFloor(floorId: number) {
        return await this.retaurantFloorRepo.findOne({
            where: {
                id: floorId,
            },
            select: ["id"],
            relations: ["productTypes"]
        })
    }
    async getProductTypeOnArea(areaId: number) {
        return await this.restaurantAreaRepository.findOne({
            where: {
                id: areaId,
            },
            select: ["id"],
            relations: ["productTypes"]
        })
    }
    async getProductTypeOnSection(sectionId: number) {
        return await this.restaurantSectionRepo.findOne({
            where: {
                id: sectionId,
            },
            select: ["id"],
            relations: ["productTypes"]
        })
    }
    async getTablesByFloor(floorId: number) {
        return await this.tablesRepo.find({
            where: {
                floor: floorId
            }
        })
    }
    async getTablesByArea(areaId: number) {
        return await this.tablesRepo.find({
            where: {
                area: areaId
            }
        })
    }
    async getTablesBySection(sectionId: number) {
        return await this.tablesRepo.find({
            where: {
                section: sectionId
            }
        })
    }
    async updateTablesForSection(body: any) {
        if (body.sectionId == null) {
            const section = await this.createRestaurantScetion({
                area: body.areaId,
                productTypes: body.productTypes,
                sectionName: body.sectionName,
                pax: body.pax,
                numberOfTables: body.tables.length
            })
            // populate section id in all tables...
            const tables = await this.tablesRepo.save(body.tables.map((table: any) => {
                return {
                    ...table,
                    section: section.id
                }
            }))
            //returning data...
            section.tables = tables
            return {
                message: "Done",
                statusCode: 201,
                data: section
            }
        } else {
            console.log(body.oldTables)
            await Promise.all([
                this.tablesRepo.delete(body.oldTables),
                this.restaurantSectionRepo
                .createQueryBuilder()
                .relation(tbRestaurantSection, "productTypes")
                .of(body.sectionId)
                .addAndRemove(body.productTypes, body.oldProductTypes),
                this.restaurantSectionRepo.update(body.sectionId, {
                    sectionName: body.sectionName,
                    pax: body.pax,
                    numberOfTables: body.tables.length
                })
            ])
            console.log(body.tables)
            const tables = await this.tablesRepo.save(body.tables)
            return {
                message: "Done",
                statusCode: 201,
                data: tables
            }
        }
    }
    async updateTableForArea(body: any) {
        if (body.areaId == null) {
            const area = await this.createRestaurantArea({
                areaName: body.areaName,
                floor: body.floorId,
                productTypes: body.productTypes,
                pax: body.pax
            })

            //populating area id in all tables...
            const tables = await this.tablesRepo.save(body.tables.map((table: any) => {
                return {
                    ...table,
                    area: area.id
                }
            }))

            //returning data...
            area.tables = tables
            return {
                message: "Done",
                statusCode: 201
            }
        } else {
            await this.tablesRepo.delete(body.tables.map(a => a.id))
            const tables = await this.tablesRepo.save(body.tables)
            return {
                message: "Done",
                statusCode: 201,
                data: tables
            }
        }
    }
    async updateTableForFloor(body: any) {
        if (body.floorId == null) {
            const floor = await this.createRestaurantFloor({
                floorName: body.areaName,
                productTypes: body.productTypes,
                outlet: body.outletId,
                restaurant: body.restaurantId,
                pax: body.pax
            })

            //populating area id in all tables...
            const tables = await this.tablesRepo.save(body.tables.map((table: any) => {
                return {
                    ...table,
                    floor: floor.id
                }
            }))

            //return data...
            floor.tables = tables
            return {
                message: "Done",
                statusCode: 201,
                data: floor
            }
        } else {
            await this.tablesRepo.delete(body.tables.map(a => a.id))
            const tables = await this.tablesRepo.save(body.tables)
            return {
                message: "Done",
                statusCode: 201,
                data: tables
            }
        }
    }
    async deleteSection(sectionId: number) {
        return await this.restaurantSectionRepo.delete(sectionId)
    }
}
