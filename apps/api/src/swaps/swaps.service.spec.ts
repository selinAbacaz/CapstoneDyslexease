import { Test, TestingModule } from '@nestjs/testing';
import { SwapsService } from './swaps.service';

describe('SwapsService', () => {
  let service: SwapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwapsService],
    }).compile();

    service = module.get<SwapsService>(SwapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
