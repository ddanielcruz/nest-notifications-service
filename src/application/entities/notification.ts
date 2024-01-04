import { randomUUID } from 'node:crypto';

import type { Optional } from '@/helpers/optional';

import { Content } from './content';

interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  public readonly id: string;

  get recipientId(): string {
    return this.props.recipientId;
  }

  get content(): Content {
    return this.props.content;
  }

  get category(): string {
    return this.props.category;
  }

  get readAt(): Date | null {
    return this.props.readAt || null;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  constructor(props: Optional<NotificationProps, 'createdAt'>, id?: string) {
    this.id = id || randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }
}
