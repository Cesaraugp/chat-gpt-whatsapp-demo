import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ChatgptApiClientService } from '../services/chatgpt/chatgptApiClient.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly chatgptApiClientService: ChatgptApiClientService,
  ) {}

  @Get('webhooks')
  getWebhooks(@Query() query: any) {
    //const token = process.env.TOKEN
    const token = 'test';
    if (
      query['hub.mode'] == 'subscribe' &&
      query['hub.verify_token'] == token
    ) {
      return query['hub.challenge'];
    } else {
      throw new BadRequestException();
    }
  }

  @Post('webhooks')
  @HttpCode(HttpStatus.ACCEPTED)
  async postWebhooks(@Body() body: any) {
    console.log(JSON.stringify(body));
    if (
      body.entry == undefined ||
      body.entry.length === 0 ||
      body.entry[0].changes == undefined ||
      body.entry[0].changes[0].length === 0
    ) {
      // there aren't entries for processing
      throw new BadRequestException();
    }
    if (body.entry[0].changes[0].field !== 'messages') {
      // not from the messages webhook so dont process
      throw new BadRequestException();
    }
    const messages = body.entry[0].changes[0].value.messages.map((message) => {
      console.log(message.text.body);
      return { role: 'user', content: message.text.body };
    });
    console.log('pure messages');
    console.log(JSON.stringify(messages));
    const res = await this.chatgptApiClientService.createChatCompletion(
      messages,
    );
    console.log('ChatGPT Response ', res);
  }
}
