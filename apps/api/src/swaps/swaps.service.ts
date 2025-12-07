import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSwap, DeleteSwap, SwapOut, UpdateSwap } from '@repo/api/swap';
import { Prisma } from '@repo/database';

@Injectable()
export class SwapsService {
  constructor(private prisma: PrismaService) {}

  async findAllSwapsByFile(
    file_cuid: string,
    user_cuid: string,
  ): Promise<SwapOut[]> {
    const letterSwaps = await this.prisma.letterSwap.findMany({
      where: { file_pref: { file_cuid, file: { user_cuid } } },
      select: { letter_swap_cuid: true, letter1: true, letter2: true },
    });

    if (!letterSwaps.length) {
      const file = await this.prisma.file.findUnique({
        where: { file_cuid },
        select: { user_cuid: true },
      });

      if (!file) throw new NotFoundException('This file does not exist!');
      if (file.user_cuid !== user_cuid) {
        throw new ForbiddenException('Access Denied');
      }
    }

    return letterSwaps;
  }

  async createSwap(
    createSwapDto: CreateSwap,
    user_cuid: string,
  ): Promise<SwapOut> {
    const { file_pref_cuid } = createSwapDto;
    const file_pref = await this.prisma.filePreference.findUnique({
      where: { file_pref_cuid },
      select: { file: { select: { user_cuid: true } } },
    });

    if (!file_pref) {
      throw new NotFoundException('This file preference does not exist!');
    }
    if (file_pref.file.user_cuid !== user_cuid) {
      throw new ForbiddenException('Access Denied');
    }

    return this.prisma.letterSwap.create({
      data: createSwapDto,
      select: { letter_swap_cuid: true, letter1: true, letter2: true },
    });
  }

  async updateSwap(
    updateSwapDto: UpdateSwap,
    user_cuid: string,
  ): Promise<SwapOut> {
    const { letter_swap_cuid, ...updatedInfo } = updateSwapDto;

    try {
      return this.prisma.letterSwap.update({
        where: {
          letter_swap_cuid,
          file_pref: { file: { user_cuid } },
        },
        data: updatedInfo,
        select: { letter_swap_cuid: true, letter1: true, letter2: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const existing_swap = await this.prisma.letterSwap.findUnique({
          where: { letter_swap_cuid },
        });

        if (!existing_swap) {
          throw new NotFoundException('This letter swap does not exist');
        } else {
          throw new ForbiddenException('Access Denied');
        }
      }
    }
  }

  async deleteSwap(
    deleteSwapDto: DeleteSwap,
    user_cuid: string,
  ): Promise<SwapOut> {
    const { letter_swap_cuid } = deleteSwapDto;
    try {
      return this.prisma.letterSwap.delete({
        where: { letter_swap_cuid, file_pref: { file: { user_cuid } } },
        select: { letter_swap_cuid: true, letter1: true, letter2: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const existing_swap = await this.prisma.letterSwap.findUnique({
          where: { letter_swap_cuid },
        });

        if (!existing_swap) {
          throw new NotFoundException('This letter swap does not exist');
        } else {
          throw new ForbiddenException('Access Denied');
        }
      }
    }
  }
}
