import { Column, Entity, JoinTable, ManyToMany, OneToMany, Relation } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { ApiEntity } from '../api/api.entity'
import { ConfigEntity } from '../config/config.entity'

@Entity({ name: 'sys_game' })
export class GameEntity extends CompleteEntity {
  @Column({ comment: '游戏名称' })
  name: string

  @Column({ comment: '游戏icon' })
  icon: string

  @Column({ comment: '游戏描述' })
  description: string

  // 游戏类型
  @Column({ comment: '游戏类型' })
  type: string

  // 游戏web地址
  @Column({ comment: '游戏web地址' })
  webUrl: string

  // 游戏服务器地址
  @Column({ comment: '游戏服务器地址' })
  serverUrl: string

  // 游戏状态
  @Column({ comment: '游戏状态' })
  status: number

  @ManyToMany(() => ApiEntity, api => api.games)
  @JoinTable({
    name: 'sys_api_games',
    joinColumn: { name: 'game_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'api_id', referencedColumnName: 'id' },
  })
  apis: Relation<ApiEntity[]>

  @OneToMany(() => ConfigEntity, config => config.game)
  configs: Relation<ConfigEntity[]>
}
