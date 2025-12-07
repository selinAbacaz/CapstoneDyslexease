import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSwap, SwapOut } from '@repo/api/swap';

@Injectable()
export class SwapsService {
  constructor(private prisma: PrismaService) {}

  async findAllSwapsByFile(
    file_cuid: string,
    user_cuid: string,
  ): Promise<SwapOut[]> {
    const file = await this.prisma.file.findUnique({
      where: { file_cuid },
      select: { user_cuid: true },
    });

    if (!file) throw new NotFoundException('There is not existing file!');
    if (file.user_cuid !== user_cuid) {
      throw new ForbiddenException('Access Denied');
    }

    return this.prisma.letterSwap.findMany({
      where: { file_pref: { file_cuid } },
      select: { letter_swap_cuid: true, letter1: true, letter2: true },
    });
  }

  createSwap(createSwapDto: CreateSwap): Promise<SwapOut> {
    return this.prisma.letterSwap.create({
      data: createSwapDto,
      select: { letter_swap_cuid: true, letter1: true, letter2: true },
    });
  }
}
