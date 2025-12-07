import { Test, TestingModule } from '@nestjs/testing';
import { FilePrefsController } from './file-prefs.controller';

describe('FilePrefsController', () => {
  let controller: FilePrefsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilePrefsController],
    }).compile();

    controller = module.get<FilePrefsController>(FilePrefsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
