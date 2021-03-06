import { Test, TestingModule } from '@nestjs/testing';
import { AggregatorsService } from './aggregators.service';

describe('AggregatorsService', () => {
  let service: AggregatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AggregatorsService],
    }).compile();

    service = module.get<AggregatorsService>(AggregatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
