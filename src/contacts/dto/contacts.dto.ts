import { gender } from "@prisma/client"
import { IsOptional } from "class-validator"


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
    id:        string 
    name:      string
    gender:    gender
    email:     string
    phone:     string
    createdAt: Date
    updatedAt: Date
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
  