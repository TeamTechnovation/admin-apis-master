import { ApiProperty } from "@nestjs/swagger"

export class UserDto {
    @ApiProperty()
    id?: number

    @ApiProperty()
    firstname?: string

    @ApiProperty()
    lastname?: string

    @ApiProperty()
    email?:string

    
    lastSession?: Date

    @ApiProperty()
    password?: string

    @ApiProperty()
    phone?: string

    @ApiProperty()
    status?: boolean

    @ApiProperty()
    message?: string
    token?: string
}
