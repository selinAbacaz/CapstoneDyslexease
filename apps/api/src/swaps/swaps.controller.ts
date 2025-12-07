import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SwapsService } from './swaps.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtUser } from 'src/strategies/jwt.strategy';
import { CreateSwap, DeleteSwap, SwapOut, UpdateSwap } from '@repo/api/swap';

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
  create(
    @Body() createSwapDto: CreateSwap,
    @CurrentUser() user: JwtUser,
  ): Promise<SwapOut> {
    return this.swapsService.createSwap(createSwapDto, user.user_cuid);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Body() updateSwapDto: UpdateSwap,
    @CurrentUser() user: JwtUser,
  ): Promise<SwapOut> {
    return this.swapsService.updateSwap(updateSwapDto, user.user_cuid);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  delete(
    @Body() deleteSwapDto: DeleteSwap,
    @CurrentUser() user: JwtUser,
  ): Promise<SwapOut> {
    return this.swapsService.deleteSwap(deleteSwapDto, user.user_cuid);
  }
}
