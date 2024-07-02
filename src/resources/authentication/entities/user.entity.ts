import { Audit } from "src/commons/shared/entities/audit.entity";

export class User extends Audit {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}