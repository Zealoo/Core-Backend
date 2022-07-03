import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { CommunityService } from '../services/community.service';

@ApiTags('Communities')
@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communityService.createComminity(createCommunityDto);
  }

  @Get()
  findAll() {
    return this.communityService.getAllComminities();
  }

  // search for community by name or id
  @Get('/find/:query')
  findOne(@Param('query') query: string) {
    return this.communityService.getACommunityByIdOrName(query);
  }

  // search for communities
  @Get('search')
  search(@Query('query') query: string) {
    return this.communityService.searchCommunity(query);
  }

  @Get('/count')
  getUsersCount() {
    return this.communityService.communitiesCount();
  }
}
