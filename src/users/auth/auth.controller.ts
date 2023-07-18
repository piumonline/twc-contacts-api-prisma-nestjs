import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dto';
import { AuthService } from './auth.service';

@Controller('users/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    @Post('/login')
    login(@Body() body: LoginUserDto) {
        return this.authService.login(body);
    }
}
