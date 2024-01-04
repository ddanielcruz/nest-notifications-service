import {
  NotificationsRepository,
  Notification,
} from '@/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository extends NotificationsRepository {
  public items: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.items.push(notification);
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    return this.items.filter((item) => item.recipientId === recipientId).length;
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id === id);
    return notification || null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.items.filter((item) => item.recipientId === recipientId);
  }

  async save(notification: Notification): Promise<void> {
    const index = this.items.findIndex((item) => item.id === notification.id);
    this.items[index] = notification;
  }
}
