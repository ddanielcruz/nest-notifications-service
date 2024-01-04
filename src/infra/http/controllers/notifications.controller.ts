import { Body, Controller, Post } from '@nestjs/common';

import { SendNotification } from '@/application/services/send-notification';

import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;
    await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });
  }
}
