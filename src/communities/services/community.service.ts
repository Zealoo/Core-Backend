import { Injectable } from '@nestjs/common';
import { Community } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCommunityDto } from '../dto/create-community.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly prismaService: PrismaService) {}

  createComminity(communityDto: CreateCommunityDto): Promise<Community> {
    return this.prismaService.community.create({
      data: communityDto,
    });
  }

  getAllComminities(): Promise<Community[]> {
    return this.prismaService.community.findMany();
  }

  getACommunityByIdOrName(field: string): Promise<Community> {
    return this.prismaService.community.findFirst({
      where: {
        OR: [
          {
            id: field,
          },
          {
            name: field,
          },
        ],
      },
      include: {
        CommunityMembers: {
          where: {
            role: {
              not: 'Member',
            },
          },
        },
      },
    });
  }

  // getting the total number of communities
  async communitiesCount() {
    const communitiesCount = await this.prismaService.community.count();
    return { count: communitiesCount };
  }

  searchCommunity(name: string): Promise<Community[]> {
    return this.prismaService.community.findMany({
      where: {
        OR: [
          {
            name: {
              contains: name,
            },
          },
          {
            description: {
              contains: name,
            },
          },
        ],
      },
    });
  }

  updateCommunity(
    id: string,
    communityDto: CreateCommunityDto,
  ): Promise<Community> {
    return this.prismaService.community.update({
      data: communityDto,
      where: { id },
    });
  }
}
