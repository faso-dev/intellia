import {AbstractRepository} from "../../core/repository/abstract.repository";
import Translation, {ITranslation} from "../models/translation";


class TranslationRepository extends AbstractRepository<ITranslation> {
    
    constructor() {
        super(Translation);
    }
    
    static make(): TranslationRepository {
        return new TranslationRepository();
    }
    
}

export {TranslationRepository}
