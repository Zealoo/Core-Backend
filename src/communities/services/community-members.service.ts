import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CommunityMemberDto } from '../dto/community_member.dto';
import { CommunityRoleDto } from '../dto/community_role_dto';

@Injectable()
export class CommunityMembersService {
  constructor(private readonly prismaService: PrismaService) {}

  getCommunityMembers(id: string) {
    return this.prismaService.communityMembers.findMany({
      where: { id },
    });
  }

  async getCommunityMembersCount(id: string) {
    const communitiesMembersCount =
      await this.prismaService.communityMembers.count({
        where: { id },
      });
    return { count: communitiesMembersCount };
  }

  async addCommunityMember(memberDto: CommunityMemberDto) {
    const member = await this.prismaService.communityMembers.findFirst({
      where: {
        community_id: memberDto.community_id,
        user_id: memberDto.user_id,
      },
    });
    if (!!member) throw new BadRequestException('Member already in community');
    return this.prismaService.communityMembers.create({ data: memberDto });
  }

  updateCommunityMemberRole(id: string, communityRole: CommunityRoleDto) {
    return this.prismaService.communityMembers.update({
      data: communityRole,
      where: { id },
    });
  }

  removeCommunityMember(id: string) {
    return this.prismaService.communityMembers.delete({
      where: { id },
    });
  }
}
