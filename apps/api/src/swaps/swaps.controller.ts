import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SwapsService } from './swaps.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtUser } from 'src/strategies/jwt.strategy';
import { CreateSwap, SwapOut } from '@repo/api/swap';

@Controller('swaps')
export class SwapsController {
  constructor(private swapsService: SwapsService) {}

  @Get('all/:id')
  @UseGuards(AuthGuard('jwt'))
  findByFile(
    @Param('id') file_cuid: string,
    @CurrentUser() user: JwtUser,
  ): Promise<SwapOut[]> {
    return this.swapsService.findAllSwapsByFile(file_cuid, user.user_cuid);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createSwapDto: CreateSwap): Promise<SwapOut> {
    return this.swapsService.createSwap(createSwapDto);
  }
}
