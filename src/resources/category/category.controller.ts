import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryVm } from 'src/commons/shared/viewmodels/category.vm';
import { stringToBoolean } from 'src/commons/utils/string_to_boolean.util';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryVm> {
    return new CategoryVm(await this.categoryService.create(createCategoryDto));
  }

  @Get()
  async findAll(): Promise<CategoryVm[]> {
    return (await this.categoryService.findAll()).map(category => new CategoryVm(category));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryVm> {
    return new CategoryVm(await this.categoryService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryVm> {
    return new CategoryVm(await this.categoryService.update(+id, updateCategoryDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('soft') soft: string): Promise<CategoryVm | string> {
    const parsedSoftValue = stringToBoolean(soft);

    const category = await this.categoryService.remove(+id, parsedSoftValue);

    if (category) {
      return new CategoryVm(category);
    }

    return 'La catégorie a été supprimée avec succès';
  }
}
