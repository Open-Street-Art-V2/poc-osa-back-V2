import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateArtDto } from './create-art.dto';

export class UpdateArtDto extends PartialType(CreateArtDto) {}


