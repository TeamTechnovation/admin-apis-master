import { tbItemWithQuantity } from "../entity/itemWithQuantity";
export class ProductDto {
    id?: number
    restaurant?: number
    name?: string
    alias?: string
    basePrice?: number
    description?: string
    price?: number
    tax?: number
    updatedAt?: Date
    createdAt?: Date
    status?: boolean
    productCategory?:number 
    productGroup?:number 
    addOns?:number[]
    image?: string
    productSize?:number 
    dayTime?: number
    items?: tbItemWithQuantity[]
    flag?: boolean
    productType?: number[]
}