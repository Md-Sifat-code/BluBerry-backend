import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ItemDto {
  id?: number;
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  condition: 'NEW' | 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';

  @IsString()
  @IsNotEmpty()
  issues: string;

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  estimatedValue: number;

  @IsString()
  @IsNotEmpty()
  range: string;

  @IsNotEmpty()
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';

  contact?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
