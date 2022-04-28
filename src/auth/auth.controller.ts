import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './auth-dto/Create-User-DTO';
import { LoginUserDto } from './auth-dto/Login-dto';
import { AuthService } from './auth.service';
import { UserEntity } from './User.entity';
import {ResponseFormat} from './interface/Response_Interface'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-up')
  createAccount(@Body() createUserDto: CreateUserDto): Promise<ResponseFormat> {
    return this.authService.signup(createUserDto);
  }
  @Post('login')
  @HttpCode(200)
  async login(@Body() userloginDto: LoginUserDto): Promise<ResponseFormat> {
    const result = await this.authService.login(userloginDto);
    return result;
  }
}
