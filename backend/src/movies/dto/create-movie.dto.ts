
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  publishingYear: number;
}
