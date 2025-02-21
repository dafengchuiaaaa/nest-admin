import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'

import { definePermission, Perm } from '../../auth/decorators/permission.decorator'
import { ConfigCreateQueryDto, ConfigQueryDto, ConfigUpdateQueryDto } from './config.dto'
import { ConfigEntity } from './config.entity'
import { ConfigService } from './config.service'

export const permissions = definePermission('business:config', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)

@ApiTags('业务 - 游戏配置')
@Controller('games/configs')
export class ConfigController {
  constructor(private readonly gameConfigService: ConfigService) {}

  @Post()
  @ApiOperation({ summary: '创建游戏配置' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: ConfigCreateQueryDto) {
    return this.gameConfigService.create(dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除游戏配置' })
  @Perm(permissions.DELETE)
  async delete(@Param('id') id: number) {
    return this.gameConfigService.delete(id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新游戏配置' })
  @Perm(permissions.UPDATE)
  async update(@Param('id') id: number, @Body() dto: ConfigUpdateQueryDto) {
    return this.gameConfigService.update(id, dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取游戏配置详情' })
  @Perm(permissions.READ)
  async info(@Param('id') id: number) {
    return this.gameConfigService.info(id)
  }

  @Get()
  @ApiOperation({ summary: '获取游戏配置列表' })
  @ApiResult({ type: [ConfigEntity] })
  @Perm(permissions.LIST)
  async list(@Query() dto: ConfigQueryDto): Promise<ConfigEntity[]> {
    return this.gameConfigService.list(dto)
  }
}
