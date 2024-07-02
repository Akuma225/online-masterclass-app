import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductVm } from 'src/commons/shared/viewmodels/product.vm';
import { stringToBoolean } from 'src/commons/utils/string_to_boolean.util';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductVm> {
    return new ProductVm(await this.productService.create(createProductDto));
  }

  @Get()
  async findAll(): Promise<ProductVm[]> {
    return (await this.productService.findAll()).map(product => new ProductVm(product));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductVm> {
    return new ProductVm(await this.productService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductVm> {
    return new ProductVm(await this.productService.update(+id, updateProductDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('soft') soft: string): Promise<ProductVm | string> {
    const parsedSoftValue = stringToBoolean(soft);

    const product = await this.productService.remove(+id, parsedSoftValue);

    if (product) {
      return new ProductVm(product);
    }

    return 'Le produit a été supprimé avec succès';
  }
}
