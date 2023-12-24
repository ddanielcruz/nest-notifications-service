import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { PrismaService } from './prisma.service';
import { CreateNotificationBody } from './create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async list() {
    return await this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;
    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        recipientId,
        category,
        content,
      },
    });
  }
}
