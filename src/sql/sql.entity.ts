import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  // @Column()
  // id: number;

  @Column()
  name: string;

  @PrimaryColumn()
  email: string;

  @Column('json', { nullable: true })
  profile: any;

  @Column('json', { nullable: true })
  credentials: { accessToken: string; refreshToken: string };

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
