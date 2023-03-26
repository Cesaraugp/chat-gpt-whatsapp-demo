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
import { AxiosError } from 'axios';
import { catchError, lastValueFrom } from 'rxjs';
import { ChatgptApiClientService } from '../services/chatgpt/chatgptApiClient.service';
import { WhatsappApiClientService } from '../services/whatsapp/whatsapp-api-client.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly chatgptApiClientService: ChatgptApiClientService,
    private readonly whatsappApiClientService: WhatsappApiClientService,
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
      body == undefined ||
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
    let recipientPhoneNumber;
    const messages = body.entry[0].changes[0].value.messages.map((message) => {
      console.log(message.text.body);
      recipientPhoneNumber = message.from;
      return { role: 'user', content: message.text.body };
    });
    console.log('pure messages');
    console.log(JSON.stringify(messages));
    const chatGPTResponse =
      await this.chatgptApiClientService.createChatCompletion(messages);
    const whatsappMessage = chatGPTResponse.choices.map((message) => {
      const {
        message: { content },
      } = message;
      return content;
    });
    const reswh = await lastValueFrom(
      this.whatsappApiClientService
        .sendTextMessage(recipientPhoneNumber, whatsappMessage.join('\n'))
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    console.log('ChatGPT Response ', chatGPTResponse);
    console.log('WhatsApp Response ', reswh);
  }
}
