import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class ApiDto {
  @ApiProperty({ description: 'API名称' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'APIkey' })
  @IsString()
  @IsNotEmpty()
  key: string

  @ApiProperty({ description: 'API密钥' })
  @IsString()
  @IsNotEmpty()
  secret: string

  @ApiProperty({ description: '状态', default: 1 })
  @IsNumber()
  @IsOptional()
  status?: number

  @ApiProperty({ description: '白名单', required: false })
  @IsString()
  @IsOptional()
  white_list?: string

  @ApiProperty({ description: '测试回调地址', required: false })
  @IsString()
  @IsOptional()
  test_callback?: string

  @ApiProperty({ description: '生产回调地址', required: false })
  @IsString()
  @IsOptional()
  prod_callback?: string

  @ApiProperty({ description: '描述', required: false })
  @IsString()
  @IsOptional()
  description?: string
}

export class ApiCreatQueryDto {
  @ApiProperty({ description: 'API名称' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: '描述', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: '白名单', required: false })
  @IsString()
  @IsOptional()
  white_list?: string

  @ApiProperty({ description: '状态', default: 1 })
  @IsNumber()
  @IsOptional()
  status?: number

  @ApiProperty({ description: '测试回调地址', required: false })
  @IsString()
  @IsOptional()
  test_callback?: string

  @ApiProperty({ description: '生产回调地址', required: false })
  @IsString()
  @IsOptional()
  prod_callback?: string
}

export class ApiUpdateQueryDto {
  @ApiProperty({ description: 'API名称' })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ description: '描述', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: '白名单', required: false })
  @IsString()
  @IsOptional()
  white_list?: string

  @ApiProperty({ description: '状态', default: 1 })
  @IsNumber()
  @IsOptional()
  status?: number

  @ApiProperty({ description: '测试回调地址', required: false })
  @IsString()
  @IsOptional()
  test_callback?: string

  @ApiProperty({ description: '生产回调地址', required: false })
  @IsString()
  @IsOptional()
  prod_callback?: string
}

export class ApiQueryDto {
  @ApiProperty({ description: 'API名称', required: false })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ description: 'API密钥', required: false })
  @IsString()
  @IsOptional()
  key?: string

  @ApiProperty({ description: '状态', required: false })
  @IsNumber()
  @IsOptional()
  status?: number
}
