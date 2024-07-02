import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignupDTO {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLength: 8,
    })
    password: string;

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;
}