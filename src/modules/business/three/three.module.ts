import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApiEntity } from '../api/api.entity'
import { ConfigEntity } from '../config/config.entity'
import { GameEntity } from '../game/game.entity'
import { ThreeController } from './three.controller'
import { ThreeService } from './three.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([GameEntity, ApiEntity, ConfigEntity]),
  ],
  controllers: [ThreeController],
  providers: [ThreeService],
  exports: [ThreeService], // 如果需要在其他模块中使用
})
export class ThreeModule {}
