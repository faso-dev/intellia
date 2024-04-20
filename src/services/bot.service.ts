import {Intellia} from "../../core/plugins/intellia";


const BotService = {
    async present() {
        return `Bonjour, je suis un assistant d'apprentissage Angular.
         Je peux vous aider à apprendre Angular.
        Vous êtes un débutant, un intermédiaire, un junior, un senior ou un expert?
        Tapez "Débutant", "Intermédiaire", "Junior", "Senior" ou "Expert" pour commencer.
        Ou posez-moi une question spécifique sur Angular.`
    },
    async prompt(question: string) {
        return Intellia.create().ask(question);
    }
}

export {
    BotService
}
