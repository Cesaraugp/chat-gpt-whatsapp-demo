import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ApiConfigService } from 'src/configuration/api-config.service';

@Injectable()
export class WhatsappApiClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly apiConfigService: ApiConfigService,
  ) {}

  private baseUrl(): string {
    const { version, phoneNumberId } = this.apiConfigService.whatsAppSettings;
    return `https://graph.facebook.com/${version}/${phoneNumberId}`;
  }

  sendTextMessage(
    recipientPhoneNumber: string,
    message: string,
  ): Observable<AxiosResponse<any>> {
    const body = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientPhoneNumber,
      type: 'text',
      text: {
        preview_url: false,
        body: message,
      },
    };
    return this.httpService.post(`${this.baseUrl()}/messages`, body, {
      headers: {
        Authorization: `Bearer ${this.apiConfigService.whatsAppSettings.apiKey}`,
      },
    });
  }
}
