import { Module } from '@nestjs/common';
import { ApiConfigModule } from 'src/configuration/api-config.module';
import { ApiConfigService } from 'src/configuration/api-config.service';
import { WhatsappController } from './controllers//whatsapp.controller';
import { ChatgptApiClientService } from './services/chatgpt/chatgptApiClient.service';

@Module({
  imports: [ApiConfigModule],
  controllers: [WhatsappController],
  providers: [ApiConfigService, ChatgptApiClientService],
  exports: [ChatgptApiClientService],
})
export class WhatsappWebhooksModule {}
