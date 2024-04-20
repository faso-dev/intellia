import {AbstractRepository} from "../../core/repository/abstract.repository";
import User, {IUser} from "../models/user";


class UserRepository extends AbstractRepository<IUser> {
    constructor() {
        super(User);
    }
    
    static make(): UserRepository {
        return new UserRepository();
    }
    
    async findByUsername(username: string): Promise<IUser | null> {
        return await this.findOne({username});
    }
}

export {UserRepository};
