import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsService } from './contacts/contacts.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './users/interceptors/user.interceptor';

@Module({
  imports: [ContactsModule, PrismaModule, UsersModule],
  controllers: [AppController, ContactsController],
  providers: [AppService, ContactsService,{
    provide: APP_INTERCEPTOR,
    useClass: UserInterceptor,
  }],
})
export class AppModule {}
