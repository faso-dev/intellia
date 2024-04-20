import {Intellia} from "../../core/plugins/intellia";


interface TranslateFuncArgs {
    content: string,
    sourceLang: "en" | "fr" | "de",
    targetLang: "en" | "fr" | "de"
}


const TranslatorService = {
    async translate({content, sourceLang, targetLang}: TranslateFuncArgs): Promise<string> {
        return Intellia.create().translate(content, sourceLang, targetLang);
    }
}

export {TranslatorService}
