import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  // validating first name to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'Ahmad',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  first_name: string;

  // validating first name to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'Muhammad',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  last_name: string;

  // validating first name to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'ultra',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  user_name: string;

  // validating email is empty or not and must be valid
  @ApiProperty({
    required: true,
    example: 'example@mail.com',
  })
  @IsEmail()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  email: string;

  @ApiProperty({
    required: false,
    example: 'true',
  })
  @Optional()
  suspend: boolean;

  @ApiProperty({
    required: false,
    example: 'true',
  })
  @Optional()
  accept_tos: boolean;

  // validating if the form data is a valid email
  @ApiProperty({
    required: true,
    example: '12345678  ',
  })
  @Length(8)
  password: string;
}
