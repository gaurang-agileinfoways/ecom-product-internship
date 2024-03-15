import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    product_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    desc: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsEmpty()
    images: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    stock: {
        quantity: number;
        size: string;
    }[];
}
