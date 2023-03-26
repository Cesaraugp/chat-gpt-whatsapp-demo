import { Module } from '@nestjs/common';
import { WhatsappController } from './controllers//whatsapp.controller';
import { ChatgptApiClientService } from './services/chatgpt/chatgptApiClient.service';

@Module({
  controllers: [WhatsappController],
  providers: [ChatgptApiClientService],
  exports: [ChatgptApiClientService],
})
export class WhatsappWebhooksModule {}
