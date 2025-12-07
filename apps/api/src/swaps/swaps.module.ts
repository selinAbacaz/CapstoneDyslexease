import { Module } from '@nestjs/common';
import { SwapsController } from './swaps.controller';
import { SwapsService } from './swaps.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SwapsController],
  providers: [SwapsService, PrismaService],
})
export class SwapsModule {}
