import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from '../../system/role/role.module'
import { UserModule } from '../../user/user.module'
import { GameController } from './game.controller'
import { GameEntity } from './game.entity'
import { GameService } from './game.service'

const services = [GameService]
@Module({
  imports: [TypeOrmModule.forFeature([GameEntity]), UserModule, RoleModule],
  controllers: [GameController],
  providers: [GameService],
  exports: [TypeOrmModule, ...services],
})
export class GameModule {}
