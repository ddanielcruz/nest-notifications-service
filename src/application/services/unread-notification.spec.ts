import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';

import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { makeNotification } from '@/test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: UnreadNotification;

describe('Unread notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new UnreadNotification(inMemoryNotificationsRepository);
  });

  it('should be able to unread a notification', async () => {
    const createdNotification = makeNotification({ readAt: new Date() });
    await inMemoryNotificationsRepository.create(createdNotification);

    await sut.execute({ notificationId: createdNotification.id });

    expect(inMemoryNotificationsRepository.items[0].readAt).toBe(null);
  });

  it('should not be able to unread a non existing notification', async () => {
    const promise = sut.execute({ notificationId: 'fake_notification_id' });
    await expect(promise).rejects.toThrowError(NotificationNotFoundError);
  });
});
