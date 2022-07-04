import { ApiProperty } from '@nestjs/swagger';
import { CommunityRole } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CommunityRoleDto {
  @ApiProperty({
    required: true,
    enum: CommunityRole,
    enumName: 'Role',
    description: 'enum for role',
  })
  @IsNotEmpty()
  @IsEnum(CommunityRole)
  role: CommunityRole;
}
