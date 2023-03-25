import { BasicEntity } from './Base';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { IsInt, Max, Min } from 'class-validator';
import { User } from './User';
import { Product } from './Product';

@Entity('shops')
export class Shop extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // one to one relation with user
  @OneToOne(() => User)
  owner: User;

  // one to many relation with products
  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];

  // tax percentage 0-100 validation
  @Column()
  @IsInt()
  @Max(100)
  @Min(0)
  taxPercentage: number;
}
