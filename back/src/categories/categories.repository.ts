import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/categories.entity';
import { CreateCategoryDto } from 'src/dtos/CreateCategoryDto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async addCategories(categories: string[]): Promise<Category[]> {
    const existingCategories = await this.categoryRepository.find();
    const existingNames = existingCategories.map((cat) => cat.name);
    const newCategories = categories
      .filter((name) => !existingNames.includes(name))
      .map((name) => ({ name }));

    return this.categoryRepository.save(newCategories);
  }

  async createCategory(categories: CreateCategoryDto): Promise<{ message: string }> {
    const categoriesExist = await this.categoryRepository.findOne({ where: { name: categories.name } });

    if (categoriesExist) {
      throw new BadRequestException(`Ya existe la categoría con el nombre: ${categories.name}`);
    }

    await this.categoryRepository.save(categories);
    return { message: `Categoría ${categories.name}, creada con éxito` };
  }
}
