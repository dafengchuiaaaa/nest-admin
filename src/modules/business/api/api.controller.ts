import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { CreatorPipe } from '~/common/pipes/creator.pipe'
import { UpdaterPipe } from '~/common/pipes/updater.pipe'
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { ApiCreatQueryDto, ApiQueryDto, ApiUpdateQueryDto } from './api.dto'

import { ApiEntity } from './api.entity'
import { ApiService } from './api.service'

export const permissions = definePermission('business:api', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)

@ApiSecurityAuth()
@ApiTags('业务 - API模块')
@Controller('apis')
export class ApiController {
  constructor(private apiService: ApiService) {}
  @Get()
  @ApiOperation({ summary: '获取API列表' })
  @ApiResult({ type: [ApiEntity] })
  @Perm(permissions.LIST)
  async list(@Query() dto: ApiQueryDto): Promise<ApiEntity[]> {
    return this.apiService.list(dto)
  }

  @Post()
  @ApiOperation({ summary: '创建API' })
  @Perm(permissions.CREATE)
  async create(@Body(CreatorPipe) dto: ApiCreatQueryDto): Promise<void> {
    await this.apiService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询API信息' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number) {
    return this.apiService.info(id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新API' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body(UpdaterPipe) dto: ApiUpdateQueryDto): Promise<void> {
    await this.apiService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除API' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.apiService.delete(id)
  }
}
