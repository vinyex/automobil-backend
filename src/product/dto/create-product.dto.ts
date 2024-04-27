import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  merk: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  note: string;
}
