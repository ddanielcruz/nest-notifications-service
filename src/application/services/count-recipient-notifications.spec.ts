import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';

import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@/test/factories/notification-factory';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: CountRecipientNotifications;

describe('Count recipient notifications', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new CountRecipientNotifications(inMemoryNotificationsRepository);
  });

  it('should count recipient notifications', async () => {
    const expected = 7;
    for (let idx = 0; idx < expected; idx++) {
      await inMemoryNotificationsRepository.create(
        makeNotification({ recipientId: 'recipient_1' }),
      );
    }
    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient_2' }),
    );

    const { count } = await sut.execute({ recipientId: 'recipient_1' });
    expect(count).toEqual(expected);
  });
});
