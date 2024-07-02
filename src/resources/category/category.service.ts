import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/commons/services/prisma.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateCategoryDto): Promise<Category> {
    // Check if the category already exists

    const existingCategory = await this.prismaService.category.findFirst({
      where: {
        name: data.name
      }
    });

    if (existingCategory) {
      throw new HttpException('Une catégorie avec ce nom existe déjà', HttpStatus.CONFLICT);
    }

    // Create the category

    return this.prismaService.category.create({
      data: {
        name: data.name
      }
    });
  }

  async findAll(): Promise<Category[]> {
    return this.prismaService.category.findMany({
      orderBy: [
        { createdAt: 'desc' }
      ]
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.prismaService.category.findUnique({
      where: {
        id
      }
    });

    if (!category) {
      throw new HttpException('Catégorie non trouvée', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Category> {

    // Check if the category exists
    const category = await this.findOne(id);

    // Check if the category already exists with the new name

    if (data.name) {
      const existingCategory = await this.prismaService.category.findFirst({
        where: {
          name: data.name,
          id: {
            not: id
          }
        }
      });

      if (existingCategory) {
        throw new HttpException('Une catégorie avec ce nom existe déjà', HttpStatus.CONFLICT);
      }
    }

    // Update the category

    return this.prismaService.category.update({
      where: {
        id
      },
      data: {
        name: data.name || category.name
      }
    });
  }

  async remove(id: number, is_soft: boolean = false): Promise<Category | null> {
    // Check if the category exists
    await this.findOne(id);

    if (is_soft) {
      return this.prismaService.category.update({
        where: {
          id
        },
        data: {
          deletedAt: new Date()
        }
      });
    }

    await this.prismaService.category.delete({
      where: {
        id
      }
    });

    return null;
  }
}
