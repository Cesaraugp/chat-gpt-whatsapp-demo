import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { ApiConfigService } from 'src/configuration/api-config.service';

@Injectable()
export class ChatgptApiClientService {
  public readonly openai: OpenAIApi;

  constructor(private readonly apiConfigService: ApiConfigService) {
    const { apiKey } = this.apiConfigService.chatGptSettings;
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async createChatCompletion(messages: []) {
    try {
      const completion = await this.openai.createChatCompletion(
        {
          model: 'gpt-3.5-turbo',
          messages,
          temperature: 0.7,
        },
        {
          timeout: 30000,
        },
      );
      return completion.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
}
