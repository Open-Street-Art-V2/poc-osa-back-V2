import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { Art } from './art.entity';
import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { GetArtsQuery } from './types/query-params.type';

@Controller('art')
@ApiTags('Art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createArtDto: CreateArtDto) {
    const art: Art = await this.artService.createArt(createArtDto);
    return {
      statusCode: 201,
      art: art,
    };
  }

  @Get()
  public async getArts(@Query() queryParams: GetArtsQuery) {
    if (Object.keys(queryParams).length === 0) {
      // if no params in the query
      const art: Art[] = await this.artService.getArts();
      return {
        statusCode: 200,
        art: art,
      };
    }
    //FIXME: Ce truc ne sert à rien, il est étouffé par @Get(":artId") un peu plus en bas
    const art: Art = await this.artService.getArtByTitle(queryParams.title);
    return {
      statusCode: 200,
      art: art,
    };
  }

  @Get(':artId')
  public async getArt(@Param('artId') artId: number) {
    const art: Art = await this.artService.getArt(artId);
    return {
      statusCode: 200,
      art: art,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':artId')
  public async update(
    @Param('artId') artId: number,
    @Body() updateArtDto: UpdateArtDto,
  ) {
    const art: Art = await this.artService.editArt(artId, updateArtDto);
    return {
      statusCode: 200,
      art: art,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:artId')
  public async remove(@Param('artId') artId: number) {
    const art: DeleteResult = await this.artService.deleteArt(artId);
    return {
      statusCode: 200,
      deleted: {
        id: artId,
        affected: art.affected,
      },
    };
  }
}
