import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { SendNotification } from '@/application/services/send-notification';
import { CancelNotification } from '@/application/services/cancel-notification';
import { CountRecipientNotifications } from '@/application/services/count-recipient-notifications';
import { FetchRecipientNotifications } from '@/application/services/fetch-recipient-notifications';
import { ReadNotification } from '@/application/services/read-notification';
import { UnreadNotification } from '@/application/services/unread-notification';

import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly countRecipientNotifications: CountRecipientNotifications,
    private readonly fetchRecipientNotifications: FetchRecipientNotifications,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @Get('from/:recipientId')
  async findManyFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.fetchRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }
}
