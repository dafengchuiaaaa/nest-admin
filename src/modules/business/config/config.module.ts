import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from '../../system/role/role.module'
import { UserModule } from '../../user/user.module'
import { ConfigController } from './config.controller'
import { ConfigEntity } from './config.entity'
import { ConfigService } from './config.service'

const services = [ConfigService]
@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity]), UserModule, RoleModule],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports: [TypeOrmModule, ...services],
})
export class GConfigModule {}
