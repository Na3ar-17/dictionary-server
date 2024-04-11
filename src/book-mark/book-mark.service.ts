import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookMarkDTO } from './dto/bookMark.dto';

@Injectable()
export class BookMarkService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string) {
    console.log(id);

    const bookMark = await this.prisma.bookMark.findUnique({
      where: {
        id,
      },
    });

    if (!bookMark) throw new NotFoundException('Book mark not found');

    return bookMark;
  }

  async getAll() {
    return await this.prisma.bookMark.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(dto: BookMarkDTO) {
    const bookMarks = await this.getAll();

    await bookMarks.forEach((el) => {
      if (el.title === dto.title) {
        throw new ConflictException('Title must be unique');
      }
    });

    const newBookMark = await this.prisma.bookMark.create({
      data: {
        title: dto.title,
      },
    });

    return newBookMark;
  }

  async update(id: string, dto: BookMarkDTO) {
    const bookMark = await this.getOne(id);

    const bookMarks = await this.getAll();

    await bookMarks.forEach((el) => {
      if (el.title === dto.title) {
        throw new ConflictException('Title must be unique');
      }
    });

    const updatedBookMark = await this.prisma.bookMark.update({
      where: {
        id: bookMark.id,
      },
      data: {
        title: dto.title || bookMark.title,
        updatedAt: new Date().toISOString(),
      },
    });

    return updatedBookMark;
  }

  async delete(id: string) {
    const bookMark = await this.getOne(id);

    const deletedBookMark = await this.prisma.bookMark.delete({
      where: {
        id: bookMark.id,
      },
    });
  }
}
