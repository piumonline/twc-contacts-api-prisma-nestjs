import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersSerice: UsersService) {}

    @Get()
    getUsers() {
    return this.usersSerice.getUsers()
    }
}
