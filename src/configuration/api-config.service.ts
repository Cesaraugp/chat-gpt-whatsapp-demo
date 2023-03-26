import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IAppSettings, IChatGptSettings } from './interfaces';

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  get appSettings(): IAppSettings {
    return this.configService.get('appSettings');
  }

  get chatGptSettings(): IChatGptSettings {
    return this.configService.get('chatGptSettings');
  }
}
