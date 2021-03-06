import { Test, TestingModule } from '@nestjs/testing';
import { ItemReceiveDispatchController } from './item-receive-dispatch.controller';

describe('ItemReceiveDispatchController', () => {
  let controller: ItemReceiveDispatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemReceiveDispatchController],
    }).compile();

    controller = module.get<ItemReceiveDispatchController>(ItemReceiveDispatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
