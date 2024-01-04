import { Injectable } from '@nestjs/common';

import {
  Notification,
  NotificationsRepository,
} from '../repositories/notifications-repository';

interface FetchRecipientNotificationsRequest {
  recipientId: string;
}

interface FetchRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class FetchRecipientNotifications {
  constructor(private readonly notificationsRepo: NotificationsRepository) {}

  async execute({
    recipientId,
  }: FetchRecipientNotificationsRequest): Promise<FetchRecipientNotificationsResponse> {
    const notifications = await this.notificationsRepo.findManyByRecipientId(
      recipientId,
    );

    return { notifications };
  }
}
