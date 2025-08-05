import { IsNotEmpty, IsString } from 'class-validator';

export class ReviewDTO {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

   @IsNotEmpty()
  @IsString()
  rating: number;
  
  @IsNotEmpty()
  @IsString()
  text: string;

 
}
