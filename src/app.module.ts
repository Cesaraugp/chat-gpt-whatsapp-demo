import { Module } from '@nestjs/common';
import { WhatsappWebhooksModule } from './ whatsapp-webhooks/ whatsapp-webhooks.module';
import { WhatsappController } from './ whatsapp-webhooks/controllers/whatsapp.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiConfigModule } from './configuration/api-config.module';
import { ApiConfigService } from './configuration/api-config.service';

@Module({
  imports: [WhatsappWebhooksModule, ApiConfigModule],
  controllers: [AppController, WhatsappController],
  providers: [AppService, ApiConfigService],
})
export class AppModule {}
