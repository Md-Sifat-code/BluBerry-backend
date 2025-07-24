import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class ReviewDTO {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  review: string;
}
