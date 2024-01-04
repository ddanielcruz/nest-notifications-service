import { Module } from '@nestjs/common';

import { SendNotification } from '@/application/services/send-notification';

import { NotificationsController } from './controllers/notifications.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HTTPModule {}
