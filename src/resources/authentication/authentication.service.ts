import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/commons/services/prisma.service';
import { SignupDTO } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { PasswordService } from 'src/commons/services/password.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly passwordService: PasswordService
    ) { }

    async signup(data: SignupDTO): Promise<User> {
        // Check if the user already exists

        const existingUser = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (existingUser) {
            throw new HttpException("Un compte existe déjà avec ce mail", HttpStatus.CONFLICT);
        }

        // Create the user

        const hashedPassword = await this.passwordService.hashPassword(data.password);

        return this.prismaService.user.create({
            data: {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                password: hashedPassword
            }
        });
    }

    async login(data: LoginDto): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!user) {
            throw new HttpException("Utilisateur non trouvé", HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await this.passwordService.comparePassword(data.password, user.password);

        if (!isPasswordValid) {
            throw new HttpException("Mot de passe incorrect", HttpStatus.BAD_REQUEST);
        }

        return user;
    }
}
