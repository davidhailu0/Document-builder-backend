import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { Exclude } from 'class-transformer';
@Entity('UserEntity')
export class UserEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  first_name: string;
  @Column()
  middle_name: string;
  @Column()
  last_name: string;
  @Column()
  email: string;
  @Column({ select: false })
  @Exclude()
  password: string;

  @Column({ default: 'Document Generator' })
  privilage: string;

  @Column({ default: true })
  status: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
