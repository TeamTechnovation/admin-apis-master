import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tbTempRestaurant {
    @PrimaryGeneratedColumn()
    id: number

}