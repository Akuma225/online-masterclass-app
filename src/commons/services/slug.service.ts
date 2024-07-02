import { Injectable } from "@nestjs/common";
import * as slug from "slug";

@Injectable()
export class SlugService {
    generate(value: string): string {
        return slug(value, {
            lower: true,
            trim: true,
        });
    }
}