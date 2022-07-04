import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommunityMemberDto } from '../dto/community_member.dto';
import { CommunityRoleDto } from '../dto/community_role_dto';
import { CommunityMembersService } from '../services/community-members.service';

@ApiTags('Communities Member')
@Controller('communities/members')
export class CommunityController {
  constructor(
    private readonly communityMembersService: CommunityMembersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() communityMember: CommunityMemberDto) {
    return this.communityMembersService.addCommunityMember(communityMember);
  }

  @Get('/community/:id')
  findCommunitiesMembers(@Param('id') id: string) {
    return this.communityMembersService.getCommunityMembers(id);
  }

  @Get('/count/:id')
  getUsersCount(@Param('id') id: string) {
    return this.communityMembersService.getCommunityMembersCount(id);
  }

  @Auth(UserRole.Admin)
  @Patch('/role/:id')
  setUserRole(@Param('id') id: string, @Body() roleDto: CommunityRoleDto) {
    return this.communityMembersService.updateCommunityMemberRole(id, roleDto);
  }
}
