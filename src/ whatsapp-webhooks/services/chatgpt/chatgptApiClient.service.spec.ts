import { Test, TestingModule } from '@nestjs/testing';
import { ChatgptApiClientService } from './chatgptApiClient.service';

describe('ChatgptClientAPIService', () => {
  let service: ChatgptApiClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatgptApiClientService],
    }).compile();

    service = module.get<ChatgptApiClientService>(ChatgptApiClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
