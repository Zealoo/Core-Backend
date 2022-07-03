import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommunityDto {
  // validating first name to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'Zoolea',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  name: string;

  // validating first name to check if it empty or not
  @ApiProperty({
    required: false,
    example: 'this is zoolea community bla bla',
  })
  @IsOptional()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  description: string;

  // validating first name to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'cl55kvbfr00046kgh9wsg3aae',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  founder_id: string;
}
