import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignupDTO } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserVm } from 'src/commons/shared/viewmodels/user.vm';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('signup')
  async signup(@Body() data: SignupDTO): Promise<UserVm> {
    return new UserVm(await this.authenticationService.signup(data));
  }

  @Post('login')
  async login(@Body() data: LoginDto): Promise<UserVm> {
    return new UserVm(await this.authenticationService.login(data));
  }
}
