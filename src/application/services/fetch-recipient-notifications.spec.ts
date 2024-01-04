import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';

import { makeNotification } from '@/test/factories/notification-factory';
import { FetchRecipientNotifications } from './fetch-recipient-notifications';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: FetchRecipientNotifications;

describe('Fetch recipient notifications', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new FetchRecipientNotifications(inMemoryNotificationsRepository);
  });

  it('should be able to fetch recipient notifications', async () => {
    const expected = 7;
    for (let idx = 0; idx < expected; idx++) {
      await inMemoryNotificationsRepository.create(
        makeNotification({ recipientId: 'recipient_1' }),
      );
    }
    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient_2' }),
    );

    const { notifications } = await sut.execute({ recipientId: 'recipient_1' });
    expect(notifications).toHaveLength(expected);
    notifications.forEach((notification) =>
      expect(notification.recipientId).toEqual('recipient_1'),
    );
  });
});
