import { Column, Entity, Index, ManyToMany, OneToMany, Relation } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { ConfigEntity } from '../config/config.entity'
import { GameEntity } from '../game/game.entity'

@Entity({ name: 'sys_api' })
export class ApiEntity extends CompleteEntity {
  @Column({ comment: 'API名称', length: 255 })
  name: string

  @Index()
  @Column({ comment: 'API密钥', length: 64, unique: true })
  key: string

  @Column({ comment: 'API密钥', length: 64 })
  secret: string

  @Column({ comment: '状态', type: 'smallint', default: 1 })
  status: number

  @Column({ comment: '白名单', length: 255, nullable: true })
  white_list: string

  @Column({ comment: '测试回调地址', length: 255, nullable: true })
  test_callback: string

  @Column({ comment: '生产回调地址', length: 255, nullable: true })
  prod_callback: string

  @Column({ comment: '描述', length: 255, nullable: true })
  description: string

  @ManyToMany(() => GameEntity, game => game.apis)
  games: Relation<GameEntity[]>

  @OneToMany(() => ConfigEntity, config => config.api)
  configs: Relation<ConfigEntity[]>
}
