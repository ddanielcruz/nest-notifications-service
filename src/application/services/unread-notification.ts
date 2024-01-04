import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

interface UnreadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(private readonly notificationsRepo: NotificationsRepository) {}

  async execute(request: UnreadNotificationRequest): Promise<void> {
    const { notificationId } = request;
    const notification = await this.notificationsRepo.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationsRepo.save(notification);
  }
}
