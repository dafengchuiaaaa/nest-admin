import { Body, Controller, Post } from '@nestjs/common'
import { Public } from '~/modules/auth/decorators/public.decorator'
import { GameConfigRequestDto, GameListRequestDto, GameListResponseDto } from './three.dto'
import { ThreeService } from './three.service'

@Controller('ext')
export class ThreeController {
  constructor(private readonly threeService: ThreeService) {}

  @Public()
  @Post('gamelist')
  async getExtGamelist(@Body() dto: GameListRequestDto): Promise<GameListResponseDto[]> {
    return this.threeService.getExtGamelist(dto)
  }

  @Public()
  @Post('config')
  async getExtConfigByGameId(@Body() dto: GameConfigRequestDto) {
    return this.threeService.getExtConfigByGameId(dto)
  }

  // 其他 API 端点...
}
