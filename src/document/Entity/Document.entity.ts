import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DocumentEntity {
    @PrimaryGeneratedColumn('uuid')
    documentID: string;

    @Column()
    documentTitle: string;

    @Column()
    templateAuthor: string;

    @Column()
    documentGeneratorID: string;

}