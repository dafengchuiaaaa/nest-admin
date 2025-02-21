import { Module } from '@nestjs/common'

import { RouterModule } from '@nestjs/core'
import { ApiModule } from './api/api.module'
import { GConfigModule } from './config/config.module'
import { GameModule } from './game/game.module'
import { ThreeModule } from './three/three.module'

const modules = [
  ApiModule,
  GameModule,
  GConfigModule,
  ThreeModule,
]

@Module({
  imports: [
    ...modules,
    RouterModule.register([
      {
        path: '',
        module: BusinessModule,
        children: [...modules],
      },
    ]),
  ],
  exports: [...modules],
})
export class BusinessModule {}
