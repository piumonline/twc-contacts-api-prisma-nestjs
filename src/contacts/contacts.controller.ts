import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto, GetContactsResponseDto, UpdateContactsDto } from './dto';
import { User } from 'src/users/decorators/users.decorators';

@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactsService: ContactsService) {}

    @Get()
    getAllContacts(@User() userid: string) {
        console.log(userid)
        return this.contactsService.getAllContacts(userid);
    }

    @Get('/:id')
    getContactById(@Param('id') id: string,) {
        return this.contactsService.getContactById(id);
        }

    @Post()
    createContact(@Body() body: CreateContactDto, @User() userid: string) {
        return this.contactsService.createContact(body, userid);
    }


    @Put('/:id')
    async updateContact(
        @Param('id') id: string,
        @Body() body: UpdateContactsDto,
        @User() userid: string) {
            const contactUserId = await this.contactsService.getUserId(id);
            if(contactUserId !== userid) throw new UnauthorizedException('You are not authorized to update this contact')
            return this.contactsService.updateContact(id, body);
        }

    @Delete('/:id')
    async deleteContact(@Param('id') id: string, @User() userid: string) {
        const contactUserId = await this.contactsService.getUserId(id);
        if(contactUserId !== userid) throw new UnauthorizedException('You are not authorized to update this contact')
        return this.contactsService.deleteContact(id);
    }
    
}
