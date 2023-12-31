import type {
  Prisma,
  Notification as PrismaNotification,
} from '@prisma/client';

import { Notification } from '@/application/entities/notification';
import { Content } from '@/application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(notification: PrismaNotification): Notification {
    return new Notification(
      {
        recipientId: notification.recipientId,
        content: new Content(notification.content),
        category: notification.category,
        readAt: notification.readAt,
        canceledAt: notification.canceledAt,
        createdAt: notification.createdAt,
      },
      notification.id,
    );
  }
}
