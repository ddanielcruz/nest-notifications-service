import { Injectable } from '@nestjs/common';

import {
  Notification,
  NotificationsRepository,
} from '@/application/repositories/notifications-repository';

import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository extends NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({ data });
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return null;
    }

    throw new Error('Method not implemented.');
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({
      where: { id: notification.id },
      data,
    });
  }
}
