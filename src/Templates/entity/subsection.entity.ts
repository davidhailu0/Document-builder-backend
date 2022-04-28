import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';
import { TemplateEntity } from './Templet.entity';
@Entity()
export class SubsectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subsectionNumber: string;

  @Column()
  subsectionTitle: string;

  @Column()
  templateName: string;
}