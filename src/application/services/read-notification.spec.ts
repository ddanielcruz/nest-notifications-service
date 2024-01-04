import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';

import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { makeNotification } from '@/test/factories/notification-factory';
import { ReadNotification } from './read-notification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotification;

describe('Read notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotification(inMemoryNotificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const createdNotification = makeNotification();
    await inMemoryNotificationsRepository.create(createdNotification);

    await sut.execute({ notificationId: createdNotification.id });

    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const promise = sut.execute({ notificationId: 'fake_notification_id' });
    await expect(promise).rejects.toThrowError(NotificationNotFoundError);
  });
});
