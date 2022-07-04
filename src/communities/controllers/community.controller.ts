import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { UpdateCommunityDto } from '../dto/update-community.dto';
import { CommunityService } from '../services/community.service';

@ApiTags('Communities')
@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @UseGuards(JwtAuthGuard)
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
  getCommunitiesCount() {
    return this.communityService.communitiesCount();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateCommunity(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return this.communityService.updateCommunity(id, updateCommunityDto);
  }
}
