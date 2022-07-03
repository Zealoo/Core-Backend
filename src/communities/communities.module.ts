import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CommunityController } from './controllers/community.controller';
import { CommunityService } from './services/community.service';
@Module({
  controllers: [CommunityController],
  providers: [CommunityService, PrismaService],
})
export class CommunitiesModule {}
