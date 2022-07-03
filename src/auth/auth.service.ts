import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { comparePassword, hashPassword } from 'src/utils/password.bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // generating token base on payload provided using jwt
  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  // responsible for generating the user token
  tokenResponder(id: string) {
    const token = this.generateToken({ id });
    return { token };
  }

  // login handler
  async login(loginDto: LoginDto) {
    // checking if the user exist and raising exception if the user exist
    const user = await this.userService.FindByLoginDetails(loginDto.field);
    if (!user) throw new BadRequestException('Invalid credentials');

    // checking if the request password
    //match with what is stored in the database
    const passwordMatch: boolean = await comparePassword(
      loginDto.password,
      user.password,
    );

    // if the password does not match an exeptionwill be raised
    if (!passwordMatch) throw new BadRequestException('Invalid credentials');

    // generating token
    return this.tokenResponder(user.id);
  }

  // signup
  async signup(userDto: CreateUserDto) {
    const userByEmail = await this.userService.findByEmail(userDto.email);

    // checking if the email is already registered
    if (userByEmail) throw new BadRequestException('Email already taken');

    // hashing password
    userDto.password = await hashPassword(userDto.password);

    // registering user
    const user = await this.userService.create(userDto);

    // returning the token
    return this.tokenResponder(user.id);
  }
}
