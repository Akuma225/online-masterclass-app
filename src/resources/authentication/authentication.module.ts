import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PrismaService } from 'src/commons/services/prisma.service';
import { PasswordService } from 'src/commons/services/password.service';

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    PrismaService,
    PasswordService
  ],
  exports: [AuthenticationService]
})
export class AuthenticationModule { }
