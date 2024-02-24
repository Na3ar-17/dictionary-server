import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Put('/end-session/:folderId')
  async endSession(@Param('folderId') folderId: string) {
    return await this.statisticsService.endSession(folderId);
  }
}
