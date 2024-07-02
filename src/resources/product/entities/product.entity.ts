import { Audit } from "src/commons/shared/entities/audit.entity";
import { Category } from "src/resources/category/entities/category.entity";

export class Product extends Audit {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    category: Category
}
