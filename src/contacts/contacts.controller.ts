import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto, GetContactsResponseDto, UpdateContactsDto } from './dto';

@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactsService: ContactsService) {}

    @Get()
    getAllContacts() {
        return this.contactsService.getAllContacts();
    }

    @Get('/:id')
    getContactById(@Param('id') id: string,) {
        return this.contactsService.getContactById(id);
        }

    @Post()
    createContact(@Body() body: CreateContactDto) {
        return this.contactsService.createContact(body);
    }

    @Put('/:id')
    updateContact(
        @Param('id') id: string,
        @Body() body: UpdateContactsDto) {
            return this.contactsService.updateContact(id, body);
        }

    @Delete('/:id')
    deleteContact(@Param('id') id: string) {
        return this.contactsService.deleteContact(id);
    }
    
}
