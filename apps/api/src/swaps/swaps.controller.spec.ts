import { Test, TestingModule } from '@nestjs/testing';
import { SwapsController } from './swaps.controller';

describe('SwapsController', () => {
  let controller: SwapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwapsController],
    }).compile();

    controller = module.get<SwapsController>(SwapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
