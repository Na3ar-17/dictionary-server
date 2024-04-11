import { Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Patch('/end-session/:folderId')
  async endSession(@Param('folderId') folderId: string) {
    return await this.statisticsService.endSession(folderId);
  }

  @Get('/get-all')
  async getAll() {
    return await this.statisticsService.getAll();
  }

  @Get('/get-one/:folderId')
  async getOneById(@Param('folderId') folderId: string) {
    return await this.statisticsService.getOneById(folderId);
  }

  @Patch('/make-correct-answer/:folderId')
  async makeCorrectAnswer(@Param('folderId') folderId: string) {
    return await this.statisticsService.makeCorrectAnswer(folderId);
  }
}
