import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';

import { CancelNotification } from './cancel-notification';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { makeNotification } from '@/test/factories/notification-factory';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: CancelNotification;

describe('Cancel notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new CancelNotification(inMemoryNotificationsRepository);
  });

  it('should be able to cancel a notification', async () => {
    const createdNotification = makeNotification();
    await inMemoryNotificationsRepository.create(createdNotification);

    await sut.execute({ notificationId: createdNotification.id });

    expect(inMemoryNotificationsRepository.items[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const promise = sut.execute({ notificationId: 'fake_notification_id' });
    await expect(promise).rejects.toThrowError(NotificationNotFoundError);
  });
});
