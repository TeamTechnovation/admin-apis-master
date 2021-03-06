import { Test, TestingModule } from '@nestjs/testing';
import { ItemReceiveDispatchService } from './item-receive-dispatch.service';

describe('ItemReceiveDispatchService', () => {
  let service: ItemReceiveDispatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemReceiveDispatchService],
    }).compile();

    service = module.get<ItemReceiveDispatchService>(ItemReceiveDispatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
