import { Test, TestingModule } from '@nestjs/testing';
import { AggregatorsController } from './aggregators.controller';

describe('AggregatorsController', () => {
  let controller: AggregatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AggregatorsController],
    }).compile();

    controller = module.get<AggregatorsController>(AggregatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
