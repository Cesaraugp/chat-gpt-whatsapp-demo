import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IAppSettings, IChatGptSettings } from './interfaces';
import { IWhatsappSettings } from './interfaces/IWhatsapp-settings.interface';

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  get appSettings(): IAppSettings {
    return this.configService.get('appSettings');
  }

  get chatGptSettings(): IChatGptSettings {
    return this.configService.get('chatGptSettings');
  }

  get whatsAppSettings(): IWhatsappSettings {
    return this.configService.get('whatsAppSettings');
  }
}
