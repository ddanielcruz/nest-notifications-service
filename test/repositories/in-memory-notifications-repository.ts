import {
  NotificationsRepository,
  Notification,
} from '../../src/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository extends NotificationsRepository {
  public items: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.items.push(notification);
  }
}
