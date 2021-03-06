import { ApiProperty } from "@nestjs/swagger"

export class IRegisterUser {
    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName?: string

    @ApiProperty()
    email?: string

    @ApiProperty()
    password: string 
    
    @ApiProperty()
    phone?: string

    @ApiProperty()
    icp?: string
}