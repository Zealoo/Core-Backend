import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CommunityMemberDto {
  // validating community id to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'cl55nhgdu0006m3ghwnxubj3f',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  community_id: string;

  // validating first name to check if it empty or not
  @ApiProperty({
    required: true,
    example: 'cl55nhgdu0006m3ghwnxubj3f',
  })
  @IsNotEmpty()
  // transforming response body text to lower case
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  user_id: string;
}
