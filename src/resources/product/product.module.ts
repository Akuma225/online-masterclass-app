import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/commons/services/prisma.service';
import { SlugService } from 'src/commons/services/slug.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    PrismaService,
    SlugService
  ],
})
export class ProductModule { }
