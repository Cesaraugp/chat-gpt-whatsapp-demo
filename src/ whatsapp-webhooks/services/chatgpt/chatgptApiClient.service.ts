import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class ChatgptApiClientService {
  public readonly openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: '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',
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
          timeout: 5000,
        },
      );
      return completion.data.choices[0];
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
