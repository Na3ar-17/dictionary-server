import { Module } from '@nestjs/common';
import { BookMarkService } from './book-mark.service';
import { BookMarkController } from './book-mark.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BookMarkController],
  providers: [BookMarkService, PrismaService],
})
export class BookMarkModule {}
