import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notifications-repository';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private readonly notificationsRepo: NotificationsRepository) {}

  async execute({
    recipientId,
  }: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
    const count = await this.notificationsRepo.countByRecipientId(recipientId);
    return { count };
  }
}
