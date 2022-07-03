import { UserRole } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleDto } from './dto/role_dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/byid/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('/users_count')
  getUsersCount() {
    return this.usersService.usersCount();
  }

  @Get('/byemail/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Auth(UserRole.Admin)
  @Post('/role/:id')
  setUserRole(
    @Param('id') id: string,
    @Body() roleDto: RoleDto,
    @Request() req,
  ) {
    return this.usersService.setUserRole(req.user, id, roleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
