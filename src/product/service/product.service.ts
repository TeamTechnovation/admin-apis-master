import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, getConnection, In } from 'typeorm';
import { Observable, from } from 'rxjs';
import { tbProduct } from '../models/entity/product.entity';
import GetProductsDto from '../models/dto/getProduct.dto';
import { tbDayTimeCategory } from '../models/entity/dayTimeCategory.entity';
import { tbProductAndProductType } from '../models/entity/product-and-productTypes.entity';
import { tbItemWithQuantity } from '../models/entity/itemWithQuantity';
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(tbProduct)
        private readonly productRepository: Repository<tbProduct>,
        @InjectRepository(tbDayTimeCategory)
        private readonly dayTimeRepo: Repository<tbDayTimeCategory>,
        @InjectRepository(tbProductAndProductType)
        private readonly productAndProductCategory: Repository<tbProductAndProductType>,
        @InjectRepository(tbItemWithQuantity)
        private readonly itemWithQtyRepo: Repository<tbItemWithQuantity>
    ) { }
    async getAllProduct() {
        return await this.productRepository.find({
            relations: ['productCategory', 'productGroup', 'productSize', 'productType'],
            where: {
                flag: true
            },
        })
    }
    async getAllProductByRestaurant(restaurantId: number) {
        return await this.productRepository.find({
            relations: ['productCategory', 'productGroup', 'productSize', 'productType'],
            where: {
                restaurant: restaurantId,
            },
        })
    }
    async getProductByGroup(groupId: number) {
        return await this.productRepository.find({
            relations: ['productCategory', 'productGroup', 'productSize', 'productType'],
            where: {
                productGroup: groupId,
                status: true
            }
        })
    }
    getSingleProduct(id: number): Observable<any> {
        return from(this.productRepository.findOne({ where: { id: id } }));
    }
    async createProduct(product: tbProduct) {
        const savedProduct = await this.productRepository.save(product)
        await this.productAndProductCategory.save({
            product: savedProduct.id,
            type: savedProduct.productType
        })
        return savedProduct.id
    }
    async getProductItemWithQuantity(product: number) {
        return await this.itemWithQtyRepo.find({
            where: {
                product: product
            }
        })
    }
    async updateProduct(product: any) {
        try {
            const productType = product.productType
            const items = product.items
            delete product.productType
            delete product.items
            await Promise.all([
                this.productRepository.update(product.id, product),
                this.productAndProductCategory.update({ product: product.id }, { type: productType }),
                this.itemWithQtyRepo.delete({ product: product.id })
            ])
            await this.itemWithQtyRepo.save(items.map(item => {
                return {
                    quantity: item.quantity,
                    itemId: item.item,
                    product: product.id
                }
            }))
            return true
        } catch (error) {
            throw new HttpException("Cannot Update", HttpStatus.BAD_REQUEST)
        }
    }
    async deleteProduct(id: number): Promise<boolean> {
        return (await this.productRepository.delete(id)).affected > 0
    }
    async getByTypeAndOutlet(getProduct: GetProductsDto) {
        return await getConnection().query(`select * from GetProductByOutletAndTypeIds('${getProduct.typeIds.join(",")}', ${getProduct.outletId})`)
    }
    async getByTypeAndRestaurant(getProduct: GetProductsDto) {
        return await getConnection().query(`select * from GetProductByRestaurantAndTypeIds('${getProduct.typeIds.join(",")}', ${getProduct.restaurantId})`)
    }
    async getAllByRestaurant(restaurant: number) {
        return await getConnection().query(`select * from GetAllProductByRestaurant(${restaurant})`)
    }
    async getDayTimeCategoryByRestaurant(restaurantId: number) {
        return await this.dayTimeRepo.find({
            where: {
                restaurants: restaurantId
            },
            relations: ["products"]
        })
    }
    async getDayTimeCategoryByOutlet(outlet: number) {
        return await this.dayTimeRepo.find({
            where: {
                outlets: outlet
            },
            relations: ["products"]
        })
    }
}