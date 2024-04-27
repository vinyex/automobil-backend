import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Create product
   * @param createProductDto request body
   * @returns product
   */
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      await this.productService.create(createProductDto);
      return {
        success: true,
        message: 'product created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * Get products data
   * @returns products
   */
  @Get()
  async findAll(@Query('merk') merk: string) {
    try {
      const data = await this.productService.findAll(merk);
      return {
        success: true,
        data,
        message: 'Success get products data',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * Find one product data
   * @param id number
   * @returns product
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.productService.findOne(+id);
      return {
        success: true,
        data,
        message: 'product fetched successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * Update product data
   * @param id number
   * @param updateProductDto request body
   * @returns product
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      await this.productService.update(+id, updateProductDto);
      return {
        success: true,
        message: 'product updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * Remove product data
   * @param id number
   * @returns product
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.productService.remove(+id);
      return {
        success: true,
        message: 'product deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
