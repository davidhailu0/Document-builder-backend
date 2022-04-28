import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubsectionEntity } from './subsection.entity';
import { TemplateEntity } from './Templet.entity';
@Entity()
export class SectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sectionNumber: string;
  
  @Column()
  sectionTitle: string;

  @Column()
  fontSize: number;

  @Column()
  fontFamily: string;

  @Column()
  alignment: string;

  @Column({ nullable: true })
  spacing: number;

  @Column({ default: false })
  image: boolean;

  @Column({ default: false })
  table: boolean;
   
  @Column()
  templateName: string;
}
