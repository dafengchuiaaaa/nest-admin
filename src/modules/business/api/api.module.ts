import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoleModule } from '../../system/role/role.module'
import { UserModule } from '../../user/user.module'

import { ApiController } from './api.controller'
import { ApiEntity } from './api.entity'
import { ApiService } from './api.service'

const services = [ApiService]

@Module({
  imports: [TypeOrmModule.forFeature([ApiEntity]), UserModule, RoleModule],
  controllers: [ApiController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class ApiModule {}
