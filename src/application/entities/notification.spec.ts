import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', async () => {
    const notification = new Notification({
      content: new Content('valid_content'),
      recipientId: 'valid_recipient_id',
      category: 'valid_category',
    });

    expect(notification).toBeTruthy();
    expect(notification.createdAt).toBeTruthy();
  });
});
