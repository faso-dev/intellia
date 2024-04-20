import {AbstractRepository} from "../../core/repository/abstract.repository";
import Message, {IMessage} from "../models/message";


class MessageRepository extends AbstractRepository<IMessage> {
    constructor() {
        super(Message);
    }
    
    static make(): MessageRepository {
        return new MessageRepository();
    }
}

export {MessageRepository}
