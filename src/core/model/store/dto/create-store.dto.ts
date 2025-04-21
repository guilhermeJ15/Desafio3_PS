import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateStoreDto {
  @ApiProperty() @IsString() storeName: string;
  @ApiProperty() @IsBoolean() takeOutInStore: boolean;
  @ApiProperty() @IsNumber() shippingTimeInDays: number;
  @ApiProperty() @IsString() latitude: string;
  @ApiProperty() @IsString() longitude: string;
  @ApiProperty() @IsString() address1: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address2?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address3?: string;
  @ApiProperty() @IsString() city: string;
  @ApiProperty() @IsString() district: string;
  @ApiProperty() @IsString() state: string;
  @ApiProperty({ enum: ['PDV', 'LOJA'] })
  @IsIn(['PDV', 'LOJA'])
  type: 'PDV' | 'LOJA';
  @ApiProperty() @IsString() country: string;
  @ApiProperty() @IsString() postalCode: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telephoneNumber?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  emailAddress?: string;
}
