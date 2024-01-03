import { Body, Controller, Post } from '@nestjs/common';

import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from 'src/application/services/send-notification';

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
