import { Column, Entity, JoinColumn, ManyToOne, Relation, Unique } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { ApiEntity } from '../api/api.entity'
import { GameEntity } from '../game/game.entity'

@Entity({ name: 'sys_game_config' })
@Unique(['game_id', 'api_id'])
export class ConfigEntity extends CompleteEntity {
  @Column()
  game_id: number

  @Column({ nullable: true })
  api_id: number | null

  @ManyToOne(() => GameEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' })
  game: Relation<GameEntity>

  @ManyToOne(() => ApiEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'api_id' })
  api: Relation<ApiEntity>

  @Column({ type: 'json', comment: '游戏配置参数' })
  config: Record<string, any>

  @Column({ type: 'tinyint', default: 1, comment: '配置状态' })
  status: number

  @Column({ type: 'varchar', nullable: true, comment: '配置备注' })
  remark: string
}
