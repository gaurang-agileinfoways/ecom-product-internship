import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    user_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    gender: boolean;
}
