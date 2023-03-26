import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappApiClientService } from './whatsapp-api-client.service';

describe('WhatsappApiClientService', () => {
  let service: WhatsappApiClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhatsappApiClientService],
    }).compile();

    service = module.get<WhatsappApiClientService>(WhatsappApiClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
