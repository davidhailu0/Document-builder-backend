import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './User.entity';
import { CreateUserDto } from './auth-dto/Create-User-DTO';
import { LoginUserDto } from './auth-dto/Login-dto';
import { sign } from 'jsonwebtoken';
import { secret_token } from '../Secret_Token';
import { compare } from 'bcryptjs';
import { ResponseFormat } from './interface/Response_Interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async signup(signupData: CreateUserDto): Promise<ResponseFormat> {
    const userByEmail = await this.userRepository.findOne({
      select: {
        email: true,
        password: false,
      },
      where: { email: signupData.email },
    });

    if (userByEmail) {
      throw new BadRequestException('Email has already been registered');
    }

    const newUser = new UserEntity();
    Object.assign(newUser, signupData);
    const newlyCreatedEntity = await this.userRepository.save(newUser);
    delete newlyCreatedEntity.password;
    const tokenGenerated = this.generateToken(newlyCreatedEntity);
    return { ...newlyCreatedEntity, token: tokenGenerated };
  }
  async login(loginData: LoginUserDto): Promise<ResponseFormat> {
    const user = await this.userRepository.findOne({
      select: {
        email: true,
        password: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        privilage: true,
        status: true
      },
      where: {
        email: loginData.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Please Register First');
    }

    const isPasswordCorrect = await compare(loginData.password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException(
        'You Entered Incorrect Username or Password',
      );
    }
    delete user.password;
    const tokenGenerated = this.generateToken(user);
    return {...user, token: tokenGenerated};
  }
  private generateToken(user:UserEntity){
    return sign({
      id:user.id,
      email:user.email
    },secret_token);
  }
}
