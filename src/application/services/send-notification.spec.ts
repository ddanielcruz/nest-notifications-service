import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';

import { SendNotification } from './send-notification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotification;

describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotification(inMemoryNotificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const { notification } = await sut.execute({
      recipientId: 'any_recipient_id',
      category: 'any_category',
      content: 'any_content',
    });

    expect(notification).toBeTruthy();
    expect(inMemoryNotificationsRepository.items).toHaveLength(1);
    expect(inMemoryNotificationsRepository.items[0]).toEqual(notification);
  });
});
