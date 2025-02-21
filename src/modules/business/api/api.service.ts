import { randomBytes } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiCreatQueryDto, ApiQueryDto, ApiUpdateQueryDto } from './api.dto'
import { ApiEntity } from './api.entity'

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(ApiEntity)
    private apiRepository: Repository<ApiEntity>,
  ) {}

  async list(dto: ApiQueryDto): Promise<ApiEntity[]> {
    const queryBuilder = this.apiRepository.createQueryBuilder('api')

    if (dto.name)
      queryBuilder.andWhere('api.name LIKE :name', { name: `%${dto.name}%` })

    if (dto.key)
      queryBuilder.andWhere('api.key LIKE :key', { key: `%${dto.key}%` })

    if (dto.status !== undefined)
      queryBuilder.andWhere('api.status = :status', { status: dto.status })

    return queryBuilder.getMany()
  }

  async create(dto: ApiCreatQueryDto): Promise<void> {
    // 生成 16 字节的 API key
    const keyBuffer = randomBytes(16)
    const key = keyBuffer.toString('hex')

    // 生成 32 字节的 API secret
    const secretBuffer = randomBytes(32)
    const secret = secretBuffer.toString('hex')

    await this.apiRepository.save({
      ...dto,
      key,
      secret,
      status: dto.status ?? 1, // 如果未提供状态，默认为1（启用）
    })
  }

  async info(id: number): Promise<ApiEntity> {
    return this.apiRepository.findOneByOrFail({ id })
  }

  async update(id: number, dto: ApiUpdateQueryDto): Promise<void> {
    await this.apiRepository.update(id, { ...dto })
  }

  async delete(id: number): Promise<void> {
    await this.apiRepository.delete(id)
  }

  async findByKey(key: string): Promise<ApiEntity | null> {
    return this.apiRepository.findOne({ where: { key } })
  }
}
