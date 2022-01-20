import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
@Unique(["title"])
export class Art {
    @PrimaryGeneratedColumn()
    public id?: Number;

    @Column()
    public title: String;

    @Column()
    public artist: String;
    
    @Column("decimal", { precision: 10, scale: 5})
    public latitude: Number;

    @Column("decimal", { precision: 10, scale: 5})
    public longitude: Number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at?: Date;

}

