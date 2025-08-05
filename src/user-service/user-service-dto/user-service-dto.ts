import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserServiceDto {
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsString()
  @IsNotEmpty()
  serviceType: string;

  @IsString()
  @IsNotEmpty()
  itemType: string;

  @IsString()
  @IsNotEmpty()
  estimatedValue: string;

  @IsString()
  @IsNotEmpty()
  timeFrame: string;

  @IsString()
  @IsNotEmpty()
  additionalInfo: string;

  createdAt?: Date;
  updatedAt?: Date;
}
