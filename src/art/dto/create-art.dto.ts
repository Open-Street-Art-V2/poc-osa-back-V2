import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class Geo {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    latitude: Number;

    @ApiProperty()
    @IsNotEmpty()
    longitude: Number;
}

export class CreateArtDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    artist: String;

    @ApiProperty()
    @IsNotEmpty()
    latitude: Number;

    @ApiProperty()
    @IsNotEmpty()
    longitude: Number;

    /*@ApiProperty()  // On doit discuter la dessus
    @IsNotEmpty()
    geolocation: Geo;*/
}



