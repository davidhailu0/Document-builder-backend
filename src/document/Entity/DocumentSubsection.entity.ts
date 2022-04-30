import { Column, Entity, Long, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DocumentSubsectionEntity {
    @PrimaryGeneratedColumn('uuid')
    documentSubsectionID: string;

    @Column()
    documentID: string;

    @Column()
    documentGeneratorID: string;

    @Column()
    documentSectionNumber: string;

    @Column('text')
    content: string;

}