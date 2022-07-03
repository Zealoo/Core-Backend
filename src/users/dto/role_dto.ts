import { UserRole } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class RoleDto {
  @ApiProperty({
    required: true,
    enum: UserRole,
    enumName: 'Role',
    description: 'enum for role',
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
