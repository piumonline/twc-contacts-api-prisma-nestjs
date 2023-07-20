import { Injectable, NotFoundException } from '@nestjs/common';
import { gender } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface ContactParams {
    name: string;
    email: string;
    phone: string;
    gender: gender;
}

interface UpdateContactParams {
    name: string;
    email: string;
    phone: string;
    gender: gender;
}


@Injectable()
export class ContactsService {

    constructor(private readonly prismaService: PrismaService){}

    async getAllContacts(userId: string) {
        console.log("userid")

        console.log(userId)

        const contacts = await this.prismaService.contacts.findMany({
            where: {
                userId: userId
            }
        })

        if(!contacts) throw new NotFoundException('Not found contacts')

        return contacts
    }

    async getContactById(id: string) {
            
            const contact = await this.prismaService.contacts.findUnique({
                where: {
                    id: id
                }
            })
    
            if(!contact) throw new NotFoundException('Not found contact')
    
            return contact
    }

    async createContact(body: ContactParams, userId: string) {
        const contact = await this.prismaService.contacts.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                gender: body.gender,
                userId: userId
            }
        });
        console.log('contact created')
        return 'contact created'
    }

    async updateContact(id: string, data: UpdateContactParams) {

        const updatedcontact = await this.prismaService.contacts.update({
            where: {
                id: id
            },
            data
        });

        return updatedcontact
    }
    async deleteContact(id: string) {

        const deletedContact = await this.prismaService.contacts.delete({
            where: {
                id: id
            }
        });

        return id
    }

    async getUserId(id: string) {
        const currentuser = await this.prismaService.contacts.findFirst({
            where: {
                id:id
            },
            select: {
                userId: true
            }
        })

        if(!currentuser) throw new NotFoundException('Not found user')
        return currentuser.userId
    }
}
