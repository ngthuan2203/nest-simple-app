import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'First name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(18)
  age: number;

  @ApiProperty({ example: 'vn' })
  @IsString()
  nationality: string;
}
