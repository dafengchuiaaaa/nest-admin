import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GameCreateQueryDto, GameQueryDto, GameUpdateQueryDto } from './game.dto'
import { GameEntity } from './game.entity'

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
  ) {}

  async list(dto: GameQueryDto, includeRelations: boolean = false): Promise<GameEntity[]> {
    const queryBuilder = this.gameRepository.createQueryBuilder('game')

    if (includeRelations) {
      queryBuilder.leftJoinAndSelect('game.apis', 'apis')
        .leftJoinAndSelect('game.configs', 'configs')
    }

    if (dto.name) {
      queryBuilder.andWhere('game.name LIKE :name', { name: `%${dto.name}%` })
    }

    if (dto.apiId) {
      queryBuilder.innerJoin('game.configs', 'configs')
        .andWhere('configs.api_id = :apiId', { apiId: dto.apiId })
    }

    const games = await queryBuilder.getMany()

    return games
  }

  async info(id: number, APIId?: number): Promise<GameEntity | null> {
    const queryBuilder = this.gameRepository.createQueryBuilder('game')
      .where('game.id = :id', { id })

    const game = await queryBuilder.getOne()
    return game || null
  }

  async create(dto: GameCreateQueryDto): Promise<void> {
    await this.gameRepository.save(dto)
  }

  async update(id: number, dto: GameUpdateQueryDto): Promise<void> {
    await this.gameRepository.update(id, { ...dto })
  }

  async delete(id: number): Promise<void> {
    await this.gameRepository.delete(id)
  }

  async all(apiKey: string): Promise<GameEntity[]> {
    const queryBuilder = this.gameRepository.createQueryBuilder('game')
      .leftJoinAndSelect('game.apis', 'apis')
      .leftJoinAndSelect('game.configs', 'configs')
      .where('configs.api_id = :apiKey', { apiKey })
    return queryBuilder.getMany()
  }
}
