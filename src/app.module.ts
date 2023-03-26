import { Module } from '@nestjs/common';
import { WhatsappWebhooksModule } from './ whatsapp-webhooks/ whatsapp-webhooks.module';
import { WhatsappController } from './ whatsapp-webhooks/controllers/whatsapp.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [WhatsappWebhooksModule],
  controllers: [AppController, WhatsappController],
  providers: [AppService],
})
export class AppModule {}
