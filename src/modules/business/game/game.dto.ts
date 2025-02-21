import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class GameDto {
  @ApiProperty({ description: '游戏名称' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: '游戏图标' })
  @IsString()
  @IsNotEmpty()
  icon: string

  @ApiProperty({ description: '游戏地址' })
  @IsString()
  @IsNotEmpty()
  webUrl: string

  @ApiProperty({ description: '游戏描述' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ description: '游戏类型' })
  @IsString()
  @IsNotEmpty()
  type: string

  @ApiProperty({ description: '游戏服务器地址' })
  @IsString()
  @IsNotEmpty()
  serverUrl: string

  @ApiProperty({ description: '游戏状态' })
  @IsNumber()
  @IsNotEmpty()
  status: number
}

export class GameCreateQueryDto {
  @ApiProperty({ description: '游戏名称' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: '游戏图标' })
  @IsString()
  @IsOptional()
  icon?: string

  @ApiProperty({ description: '游戏地址' })
  @IsString()
  @IsOptional()
  webUrl?: string

  @ApiProperty({ description: '游戏描述' })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: '游戏类型' })
  @IsString()
  @IsNotEmpty()
  type: string

  @ApiProperty({ description: '游戏服务器地址' })
  @IsString()
  @IsOptional()
  serverUrl?: string

  @ApiProperty({ description: '游戏状态' })
  @IsNumber()
  @IsOptional()
  status?: number
}

export class GameUpdateQueryDto {
  @ApiProperty({ description: '游戏名称' })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ description: '游戏图标' })
  @IsString()
  @IsOptional()
  icon?: string

  @ApiProperty({ description: '游戏地址' })
  @IsString()
  @IsOptional()
  webUrl?: string

  @ApiProperty({ description: '游戏描述' })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: '游戏类型' })
  @IsString()
  @IsNotEmpty()
  type: string

  @ApiProperty({ description: '游戏服务器地址' })
  @IsString()
  @IsOptional()
  serverUrl?: string

  @ApiProperty({ description: '游戏状态' })
  @IsNumber()
  @IsOptional()
  status?: number
}

export class GameQueryDto {
  @ApiProperty({ description: '游戏名称', required: false })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ description: '所属apiId', required: false })
  @IsNumber()
  @IsOptional()
  apiId?: number
}
