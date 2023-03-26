import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiConfigModule } from 'src/configuration/api-config.module';
import { ApiConfigService } from 'src/configuration/api-config.service';
import { WhatsappController } from './controllers//whatsapp.controller';
import { ChatgptApiClientService } from './services/chatgpt/chatgptApiClient.service';
import { WhatsappApiClientService } from './services/whatsapp/whatsapp-api-client.service';

@Module({
  controllers: [WhatsappController],
  providers: [
    ApiConfigService,
    ChatgptApiClientService,
    WhatsappApiClientService,
  ],
  exports: [ChatgptApiClientService, WhatsappApiClientService],
  imports: [
    ApiConfigModule,
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),
  ],
})
export class WhatsappWebhooksModule {}
