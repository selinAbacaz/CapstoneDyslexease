import { Test, TestingModule } from '@nestjs/testing';
import { FilePrefsService } from './file-prefs.service';

describe('FilePrefsService', () => {
  let service: FilePrefsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilePrefsService],
    }).compile();

    service = module.get<FilePrefsService>(FilePrefsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
