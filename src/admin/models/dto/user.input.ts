import { ApiProperty } from "@nestjs/swagger"

export class IUser {
    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName?: string

    @ApiProperty()
    lastSession?: Date

    @ApiProperty()
    password: string

    @ApiProperty()
    email?: string

    @ApiProperty()
    phone?: string

    @ApiProperty()
    profileSM?: string

    @ApiProperty()
    profileL?: string

    @ApiProperty()
    addressLineOne?: [String]

    @ApiProperty()
    addressLineTwo?: String

    @ApiProperty()
    joiningDate: Date

    @ApiProperty()
    role: number
   
}