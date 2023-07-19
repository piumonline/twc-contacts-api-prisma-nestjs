import { gender } from "@prisma/client"
import { IsEnum, IsOptional, IsString } from "class-validator"


export class GetContactsResponseDto {
    id:        string 
    name:      string
    gender:    gender
    email:     string
    phone:     string
    createdAt: Date
    updatedAt: Date
    userId:    string
  }
  
  export class CreateContactDto {

    @IsString()
    name:      string

    @IsEnum(gender)
    gender:    gender

    @IsString()
    email:     string

    @IsString()
    phone:     string

    createdAt: Date
    updatedAt: Date

    @IsString()
    userId:    string
  }
  
  export class UpdateContactsDto {

    @IsOptional()
    name:      string

    @IsOptional()
    gender:    gender

    @IsOptional()
    email:     string

    @IsOptional()
    phone:     string
  }
  