import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SectionEntity } from './section.entity';
import { SubsectionEntity } from './subsection.entity';

@Entity({ name: 'Template' })
export class TemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  templateName: string;
  
  @Column()
  templateAuthor: string;

  @Column()
  authorEmail: string;
  
  @Column({ default: false })
  IsApproved: boolean;
}
