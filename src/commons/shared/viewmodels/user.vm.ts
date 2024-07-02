import { User } from "src/resources/authentication/entities/user.entity";

export class UserVm {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    createdAt: Date;

    constructor(data: User) {
        this.id = data.id;
        this.email = data.email;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.createdAt = data.createdAt;
    }
}