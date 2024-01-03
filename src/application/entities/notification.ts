import { randomUUID } from 'node:crypto';

import { Content } from './content';
import type { Optional } from '../../helpers/optional';

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
