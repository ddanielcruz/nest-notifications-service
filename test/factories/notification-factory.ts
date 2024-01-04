import { faker } from '@faker-js/faker';

import {
  Notification,
  NotificationProps,
} from '@/application/entities/notification';
import { Content } from '@/application/entities/content';

export function makeNotification(
  override?: Partial<NotificationProps & { id: string }>,
): Notification {
  return new Notification({
    category: faker.lorem.word(),
    content: new Content(faker.lorem.paragraph()),
    recipientId: faker.string.uuid(),
    createdAt: faker.date.past(),
    ...override,
  });
}
