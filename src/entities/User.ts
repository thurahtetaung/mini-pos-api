import { userType } from '../interfaces/types';
import { BasicEntity } from './Base';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Shop } from './Shop';

@Entity('users')
export class User extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // unique email
  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  userType: userType;

  @OneToOne(() => Shop, (shop) => shop.owner, {
    nullable: true,
  })
  shop: Shop;
}
