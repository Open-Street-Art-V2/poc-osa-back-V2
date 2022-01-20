import { UpdateArtDto } from './dto/update-art.dto';
import { CreateArtDto } from './dto/create-art.dto';
import { EntityRepository, Repository } from "typeorm";
import { Art } from "./art.entity";

@EntityRepository(Art)
export class ArtRepository extends Repository<Art>{

    public async createArt(createArtDto : CreateArtDto): Promise<Art>{
        // const {title, artist, latitude, longitude} = createArtDto;
        // const art=new Art();
        // art.title=title;
        // art.artist=artist;
        // art.latitude=latitude;
        // art.longitude=longitude;
        // await art.save();
        //return art;

        const art: Art = { ...createArtDto };
        return this.save(art);
        
    }

    public async editArt(updateArtDto : UpdateArtDto, editArt:Art):Promise<Art>{
        // const {title, artist, latitude, longitude} = updateArtDto;
        // editArt.title=title;
        // editArt.artist=artist;
        // editArt.longitude=longitude;
        // editArt.latitude=latitude;
        // await editArt.save();
        
        const toEdit: Art = {...editArt, ...updateArtDto}
        return this.save(toEdit);
    }
}