import { Category } from "src/resources/category/entities/category.entity";

export class CategoryVm {
    id: number;
    name: string;
    createdAt: Date;

    constructor(data: Category) {
        this.id = data.id;
        this.name = data.name;
        this.createdAt = data.createdAt;
    }
}