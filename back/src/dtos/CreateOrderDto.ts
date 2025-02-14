import { IsNotEmpty, IsUUID, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description:`Id del usuario, no puede estar vacio, debe ser tipo UUID, debe ser existente`,
    example:"9c33f7d6-ddd5-467f-a1e2-b9bdd699274a"
})
  userId: string;

  
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ApiProperty({
    description:`Id del producto, no puede estar vacio, debe ser tipo UUID, debe ser existente`,
    example: [{ id: "402d6126-9e35-4b6b-8fd4-9c956eab9e69" }]
})
  products: ProductDto[];
}
