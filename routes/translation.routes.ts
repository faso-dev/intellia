import {Hono} from "hono";
import {TranslationController} from "../src/controllers/translation.controller";
import {requireAuth} from "../src/middlewares";

const translationController = new TranslationController()
const translationRoutes = new Hono().basePath('/translations')

translationRoutes.get('',  requireAuth, translationController.search)

translationRoutes.post('',  requireAuth, translationController.translate)

export {translationRoutes}
