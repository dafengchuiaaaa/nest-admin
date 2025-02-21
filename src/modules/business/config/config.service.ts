import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConfigCreateQueryDto, ConfigQueryDto, ConfigUpdateQueryDto } from './config.dto'
import { ConfigEntity } from './config.entity'

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ConfigEntity)
    private gameConfigRepository: Repository<ConfigEntity>,
  ) {}

  async list(dto: ConfigQueryDto): Promise<ConfigEntity[]> {
    const queryBuilder = this.gameConfigRepository.createQueryBuilder('gameConfig')

    if (dto.status)
      queryBuilder.andWhere('gameConfig.status = :status', { name: `%${dto.status}%` })

    return queryBuilder.getMany()
  }

  async create(dto: ConfigCreateQueryDto): Promise<void> {
    console.log(dto)
    await this.gameConfigRepository.save({
      ...dto,
      config: JSON.parse(dto.config),
    })
  }

  async info(id: number): Promise<ConfigEntity> {
    return this.gameConfigRepository.findOneByOrFail({ id })
  }

  async update(id: number, dto: ConfigUpdateQueryDto): Promise<void> {
    await this.gameConfigRepository.update(id, {
      ...dto,
      config: JSON.parse(dto.config),
    })
  }

  async delete(id: number): Promise<void> {
    await this.gameConfigRepository.delete(id)
  }
}
