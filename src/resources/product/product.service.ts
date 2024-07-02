import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/commons/services/prisma.service';
import { SlugService } from 'src/commons/services/slug.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly slugService: SlugService
  ) { }

  async create(data: CreateProductDto): Promise<Product> {

    // Generate slug
    const slug = this.slugService.generate(data.name);

    //Logger.log(`Generated slug: ${slug}`);

    // Check if product exists
    const existingProduct = await this.prismaService.product.findFirst({
      where: {
        OR: [
          { name: data.name },
          { slug: slug }
        ]
      }
    });

    if (existingProduct) {
      throw new HttpException('Un produit avec ce nom existe déjà', HttpStatus.CONFLICT);
    }

    // Check if category exists

    const category = await this.prismaService.category.findUnique({
      where: {
        id: data.categoryId
      }
    });

    if (!category) {
      throw new HttpException('Catégorie non trouvée', HttpStatus.NOT_FOUND);
    }

    // Create product
    return this.prismaService.product.create({
      data: {
        name: data.name,
        slug: slug,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId
      },
      include: {
        category: true
      }
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        category: true
      },
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    });

    if (!product) {
      throw new HttpException('Produit non trouvé', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {

    // Check if product exists
    const product = await this.findOne(id);

    // Get product slug
    let slug = product.slug;

    // Check if product already exists with the new name

    if (data.name) {
      slug = this.slugService.generate(data.name);
      const existingProduct = await this.prismaService.product.findFirst({
        where: {
          OR: [
            { name: data.name },
            { slug: slug }
          ],
          id: {
            not: id
          }
        }
      });

      if (existingProduct) {
        throw new HttpException('Un produit avec ce nom existe déjà', HttpStatus.CONFLICT);
      }
    }

    // Check if category exists
    let categoryId = product.category.id;

    if (data.categoryId) {
      const category = await this.prismaService.category.findUnique({
        where: {
          id: data.categoryId
        }
      });

      if (!category) {
        throw new HttpException('Catégorie non trouvée', HttpStatus.NOT_FOUND);
      }

      categoryId = data.categoryId;
    }

    // Update product

    return this.prismaService.product.update({
      where: {
        id
      },
      data: {
        name: data.name || product.name,
        slug: slug,
        description: data.description || product.description,
        price: data.price || product.price,
        stock: data.stock || product.stock,
        categoryId: categoryId
      },
      include: {
        category: true
      }
    });
  }

  async remove(id: number, is_soft: boolean = false): Promise<Product | null> {
    // Check if product exists
    await this.findOne(id);

    if (is_soft) {
      return this.prismaService.product.update({
        where: {
          id
        },
        data: {
          deletedAt: new Date()
        },
        include: {
          category: true
        }
      });
    }

    await this.prismaService.product.delete({
      where: {
        id
      }
    });

    return null;
  }
}
