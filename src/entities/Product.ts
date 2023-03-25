import { productCategory } from '../interfaces/types';
import { BasicEntity } from './Base';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Shop } from './Shop';

@Entity('products')
export class Product extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: productCategory;

  @Column()
  price: number;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;
}
