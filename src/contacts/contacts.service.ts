import { Injectable, NotFoundException } from '@nestjs/common';
import { gender } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface ContactParams {
    name: string;
    email: string;
    phone: string;
    gender: gender;
    userId: string;
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

    async getAllContacts() {

        const contacts = await this.prismaService.contacts.findMany()

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

    async createContact(body: ContactParams) {
        console.log(body)
        const contact = await this.prismaService.contacts.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                gender: body.gender,
                userId: body.userId
            }
        });
        console.log('contact created')
        return 'contact created'
    }

    async updateContact(id: string, data: UpdateContactParams) {

        const contact = await this.prismaService.contacts.findUnique({
            where: {
                id: id
            }
        })

        if(!contact) throw new NotFoundException('Not found contact')

        const updatedcontact = await this.prismaService.contacts.update({
            where: {
                id: id
            },
            data
        });

        return updatedcontact
    }
    async deleteContact(id: string) {
        const contact = await this.prismaService.contacts.findUnique({
            where: {
                id: id
            }
        })

        if(!contact) throw new NotFoundException('Not found contact')

        const deletedContact = await this.prismaService.contacts.delete({
            where: {
                id: id
            }
        });

        return id
    }
}
