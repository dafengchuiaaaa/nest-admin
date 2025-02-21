import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConfigEntity } from '../config/config.entity'
import { GameEntity } from '../game/game.entity'
import { GameConfigRequestDto, GameConfigResponseDto, GameListRequestDto, GameListResponseDto } from './three.dto'

@Injectable()
export class ThreeService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
    @InjectRepository(ConfigEntity)
    private configRepository: Repository<ConfigEntity>,
  ) {}

  async getExtGamelist(dto: GameListRequestDto): Promise<GameListResponseDto[]> {
    const queryBuilder = this.gameRepository.createQueryBuilder('game')

    queryBuilder.innerJoin('game.apis', 'apis')
      .andWhere('apis.key = :apiKey', { apiKey: dto.appKey })

    const games = await queryBuilder.getMany()

    return games.map(game => ({
      name: game.name,
      icon: game.icon,
      webUrl: game.webUrl,
      description: game.description,
      type: game.type,
      serverUrl: game.serverUrl,
      status: game.status,
    }))
  }

  async getExtConfigByGameId(dto: GameConfigRequestDto): Promise<GameConfigResponseDto> {
    const queryBuilder = this.configRepository.createQueryBuilder('config')
      .innerJoin('config.api', 'api')
      .where('api.key = :apiKey', { apiKey: dto.appKey })
      .andWhere('config.game_id = :gameId', { gameId: dto.gameId })
      .andWhere('config.status = 1')

    const config = await queryBuilder.getOne()
    if (!config)
      return null

    return {
      config: JSON.stringify(config.config),
      status: config.status,
      remark: config.remark,
      game_id: config.game_id,
    }
  }

  // 其他服务逻辑...
}
