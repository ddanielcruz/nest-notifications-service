import { Controller, Get } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getNotifications() {
    return await this.prismaService.notification.findMany();
  }
}
