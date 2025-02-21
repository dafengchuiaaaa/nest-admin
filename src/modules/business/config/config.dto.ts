import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class ConfigDto {
  @ApiProperty({ description: '游戏配置参数' })
  @IsString()
  @IsNotEmpty()
  config: string

  @ApiProperty({ description: '状态', default: 1 })
  @IsNumber()
  @IsOptional()
  status?: number

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  remark?: string
}

export class ConfigCreateQueryDto {
  @ApiProperty({ description: '游戏配置参数' })
  @IsString()
  @IsNotEmpty()
  config: string

  @ApiProperty({ description: '状态', default: 1 })
  @IsNumber()
  @IsOptional()
  status?: number

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  remark?: string

  @ApiProperty({ description: '游戏ID' })
  @IsNumber()
  @IsOptional()
  game_id?: number
}

export class ConfigUpdateQueryDto {
  @ApiProperty({ description: '游戏配置参数' })
  @IsString()
  @IsOptional()
  config?: string

  @ApiProperty({ description: '状态' })
  @IsNumber()
  @IsOptional()
  status?: number

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  remark?: string
}

export class ConfigQueryDto {
  @ApiProperty({ description: '状态', required: false })
  @IsNumber()
  @IsOptional()
  status?: number
}
