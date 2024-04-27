import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(merk?: string) {
    if (merk) {
      return await this.productRepository
        .createQueryBuilder('product')
        .where('product.merk like :merk', { merk: `%${merk}%` })
        .getMany();
    }

    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let user = await this.findOne(id);
    user = this.productRepository.merge(user, updateProductDto);
    return await this.productRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.productRepository.remove(user);
  }
}
