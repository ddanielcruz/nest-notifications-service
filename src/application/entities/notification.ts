import { randomUUID } from 'node:crypto';

import type { Optional } from '@/helpers/optional';

import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
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

  get canceledAt(): Date | null {
    return this.props.canceledAt || null;
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

  public cancel(): void {
    if (!this.props.canceledAt) {
      this.props.canceledAt = new Date();
    }
  }

  public read(): void {
    if (!this.props.readAt) {
      this.props.readAt = new Date();
    }
  }

  public unread(): void {
    if (this.props.readAt) {
      this.props.readAt = null;
    }
  }
}
