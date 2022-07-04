import { BadRequestException, Injectable } from '@nestjs/common';
import { Community } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { UpdateCommunityDto } from '../dto/update-community.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComminity(communityDto: CreateCommunityDto): Promise<Community> {
    const community = await this.getACommunityByIdOrName(communityDto.name);
    if (!!community)
      throw new BadRequestException('Community with that name already exists');
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

  async updateCommunity(
    id: string,
    communityDto: UpdateCommunityDto,
  ): Promise<Community> {
    const community = await this.getACommunityByIdOrName(communityDto.name);
    if (!community) throw new BadRequestException('Community does not exists');
    return this.prismaService.community.update({
      data: communityDto,
      where: { id },
    });
  }
}
