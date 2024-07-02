import { Product } from "src/resources/product/entities/product.entity";
import { CategoryVm } from "./category.vm";

export class ProductVm {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    category: CategoryVm;
    createdAt: Date;

    constructor(data: Product) {
        this.id = data.id;
        this.name = data.name;
        this.slug = data.slug;
        this.description = data.description;
        this.price = data.price;
        this.stock = data.stock;
        this.category = new CategoryVm(data.category);
        this.createdAt = data.createdAt;
    }
}