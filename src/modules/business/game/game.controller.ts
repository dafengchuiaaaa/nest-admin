import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { CreatorPipe } from '~/common/pipes/creator.pipe'
import { UpdaterPipe } from '~/common/pipes/updater.pipe'
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { GameCreateQueryDto, GameQueryDto, GameUpdateQueryDto } from './game.dto'

import { GameEntity } from './game.entity'
import { GameService } from './game.service'

export const permissions = definePermission('business:game', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)

@ApiSecurityAuth()
@ApiTags('业务 - 游戏模块')
@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  @ApiOperation({ summary: '获取游戏列表' })
  @ApiResult({ type: [GameEntity] })
  @Perm(permissions.LIST)
  async list(@Query() dto: GameQueryDto): Promise<GameEntity[]> {
    return this.gameService.list(dto)
  }

  @Post()
  @ApiOperation({ summary: '创建游戏' })
  @Perm(permissions.CREATE)
  async create(@Body(CreatorPipe) dto: GameCreateQueryDto): Promise<void> {
    await this.gameService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询游戏信息' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number) {
    return this.gameService.info(id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新游戏' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body(UpdaterPipe) dto: GameUpdateQueryDto): Promise<void> {
    await this.gameService.update(id, { ...dto })
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除游戏' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.gameService.delete(id)
  }
}
