import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @IsNotEmpty()
  @Index({ fulltext: true })
  merk: string;

  @Column()
  @IsNotEmpty()
  type: string;

  @Column()
  @IsNotEmpty()
  stock: number;

  @Column()
  @IsNotEmpty()
  price: number;

  @Column({ type: 'text' })
  @IsOptional()
  note: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @IsNotEmpty()
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @IsNotEmpty()
  updated_at: Date;
}
