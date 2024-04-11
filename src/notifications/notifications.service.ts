import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    const newNotification = await this.prisma.notifications.create({
      data: {
        message: dto.message,
        location: dto.location,
      },
    });

    return newNotification;
  }

  async findAll() {
    return await this.prisma.notifications.findMany({
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const notification = await this.prisma.notifications.findUnique({
      where: { id },
    });

    if (!notification) throw new NotFoundException('Notification not found');
  }

  async delete(id: string) {
    const notification = await this.prisma.notifications.findUnique({
      where: { id },
    });

    const deleted = await this.prisma.notifications.delete({
      where: {
        id: notification.id,
      },
    });
  }
}
