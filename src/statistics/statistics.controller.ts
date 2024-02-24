import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/:folderId/:statisticsId')
  async getStatistics(
    @Param('folderId') folderId: string,
    @Param('statisticsId') statisticsId: string,
  ) {
    return await this.statisticsService.getStatistics(folderId, statisticsId);
  }

  @Get('')
  async getAll() {
    return await this.statisticsService.getAll();
  }

  @Put('end-session/:folderId/:statisticsId')
  async endSession(
    @Param('folderId') folderId: string,
    @Param('statisticsId') statisticsId: string,
  ) {
    return await this.statisticsService.endSession(folderId, statisticsId);
  }
}
