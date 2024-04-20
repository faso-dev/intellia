import OpenAI from 'openai';


const SUPPORTED_TRANSLATION_LANGUAGES = [
    'en',
    'fr',
    'de',
]


class Intellia {
    private openai: OpenAI;
    
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.MISTRAL_API_KEY,
            baseURL: 'https://api.mistral.ai/v1',
        });
    }
    
    static create() {
        return new Intellia();
    }
    
    async ask(prompt: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: 'mistral-tiny',
            response_format: {type: 'json_object'},
            messages: [
                {
                    role: 'system',
                    content: `Vous êtes un assistant virtuel qui aide les utilisateurs à apprendre Angular.
Voici un aperçu du chemin d'apprentissage d'Angular:
- Débutant: Nous couvrirons les bases d'Angular,- Moyen: Nous couvrirons des sujets plus avancés comme les directives, les pipes et les formulaires, - Junior: Nous couvrirons des sujets comme le routage, les gardes et les modules. Nous fournirons également un quiz et quelques défis de codage.
- Senior: Nous couvrirons des sujets avancés comme la gestion de l'état, RxJS et l'optimisation des performances.- Expert: Nous couvrirons des sujets avancés comme le rendu côté serveur, les applications web progressives et les animations. Nous fournirons également un quiz et quelques défis de codage.
- Question spécifique: Si l'utilisateur a une question spécifique, nous écouterons leur question et fournirons une réponse s'il s'agit d'Angular. Sinon, nous leur demanderons de décrire leur besoin en Angular.
`,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ]
        })
        return response.choices[0].message.content || "Je n'ai pas compris votre question";
    }
    
    async translate(content: string, sourceLang: string, targetLang: string): Promise<string> {
        // first check if the source language is supported and the target language is supported
        if (!SUPPORTED_TRANSLATION_LANGUAGES.includes(sourceLang) || !SUPPORTED_TRANSLATION_LANGUAGES.includes(targetLang)) {
            throw new Error("Unsupported language");
        }
        
        // if the source language is the same as the target language, return the content as is
        if (sourceLang === targetLang) {
            return content;
        }
        
        // translate the content
        const response = await this.openai.chat.completions.create({
            model: 'mistral-tiny',
            response_format: {type: 'json_object'},
            messages: [
                {
                    role: 'system',
                    content: `Vous êtes un assistant virtuel qui aide les utilisateurs à traduire du contenu provenant de ${sourceLang} vers ${targetLang}.`,
                },
                {
                    role: 'user',
                    content: content,
                },
            ],
            max_tokens: 500,
            temperature: 0.5,
            stop: ['\n'],
        })
        
        return response.choices[0].message.content || "Je n'ai pas compris votre question";
    }
}

export {
    Intellia
}
