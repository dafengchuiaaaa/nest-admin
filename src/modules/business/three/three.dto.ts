import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class GameListResponseDto {
  @ApiProperty({ description: '游戏名称' })
  name: string

  @ApiProperty({ description: '游戏图标' })
  icon: string

  @ApiProperty({ description: '游戏地址' })
  webUrl: string

  @ApiProperty({ description: '游戏描述' })
  description: string

  @ApiProperty({ description: '游戏类型' })
  type: string

  @ApiProperty({ description: '游戏服务器地址' })
  serverUrl: string

  @ApiProperty({ description: '游戏状态' })
  status: number
}

export class GameListRequestDto {
  @ApiProperty({ description: 'api key' })
  @IsString()
  @IsNotEmpty()
  appKey: string
}

export class GameConfigRequestDto {
  @ApiProperty({ description: 'api key' })
  @IsString()
  @IsNotEmpty()
  appKey: string

  @ApiProperty({ description: '游戏ID' })
  @IsNumber()
  @IsNotEmpty()
  gameId: number
}

export class GameConfigResponseDto {
  @ApiProperty({ description: '游戏配置参数' })
  @IsString()
  @IsNotEmpty()
  config: string

  @ApiProperty({ description: '状态', default: 1 })
  @IsNumber()
  @IsNotEmpty()
  status: number

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsNotEmpty()
  remark: string

  @ApiProperty({ description: '游戏ID' })
  @IsNumber()
  @IsNotEmpty()
  game_id: number
}
