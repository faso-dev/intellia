import {AbstractRepository} from "../../core/repository/abstract.repository";
import Conversation, {IConversation} from "../models/conversation";


class ConversationRepository extends AbstractRepository<IConversation> {
    constructor() {
        super(Conversation);
    }

    static make(): ConversationRepository {
        return new ConversationRepository();
    }

    async findByUserId(userId: string): Promise<IConversation[]> {
        return this.model.find({userId})
    }
}
export {ConversationRepository}
