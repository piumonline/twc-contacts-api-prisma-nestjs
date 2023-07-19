import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface RegisterParams {
    email: string;
    password: string;
}

interface LoginParams {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {

    constructor(private readonly prismaService: PrismaService){}

    async register({email, password }: RegisterParams) {
        const userExsists = await this.prismaService.users.findFirst({
            where: {email}
        });

        if(userExsists) throw new ConflictException('User already exists');

        const salt:number = 10;
        const hashPasswrd = await bcrypt.hash(password, salt);
        
        const user = await this.prismaService.users.create({
            data: {
                email: email,
                password: hashPasswrd,
            }
        });

        const token = await this.generateJWT(user.id)
        return token;    
    }

    async login({email, password}: LoginParams) {
        const user = await this.prismaService.users.findFirst({
            where: { email }
        });

        if(!user) {
            throw new HttpException('Invalid Creadentials', 400);
        }

        const hashedPassword = user.password
        const isValidPassword = await bcrypt.compare(password, hashedPassword)

        if(!isValidPassword) {
            throw new HttpException('Invalid Creadentials', 400)
        }

        const token = await this.generateJWT(user.id)
        return token;  

    }

    private generateJWT(id:string){
        return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: 36000})
    }
}
