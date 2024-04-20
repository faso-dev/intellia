Pour une documentation technique détaillée permettant de configurer et d'initialiser votre projet utilisant le framework
Hono pour l'API, TypeScript, et d'autres technologies, voici un guide complet que vous pourriez utiliser :

---

# Documentation Technique pour la Configuration du Projet IntellIA

## Prérequis

Avant de commencer la configuration de votre projet, assurez-vous que les éléments suivants sont installés sur votre
système :

- **Node.js**: Environnement d'exécution JavaScript côté serveur.
- **MongoDB**: Système de gestion de base de données NoSQL.
- **MongoDB Compass** (Optionnel): Interface graphique pour gérer la base de données MongoDB.

## Installation des Dépendances

1. **Clonage du projet**:
   Clonez le dépôt Git sur votre machine locale en utilisant la commande suivante :
   ```bash
   git clone git@github.com:faso-dev/intellia.git
   ```

2. **Installation des packages NPM**:
   Naviguez dans le dossier du projet et installez les dépendances en exécutant :
   ```bash
   cd intellia
   npm install
   ```
3. **Installation de Yarn** (Optionnel):
   Si vous préférez utiliser Yarn, vous pouvez l'installer en exécutant :
   ```bash
   npm install -g yarn
   ```

   puis installer les dépendances du projet avec :

    ```bash
    yarn install
    ```

## Configuration des Variables d'Environnement

Créez un fichier `.env` à la racine de votre projet et définissez les variables suivantes :

```
PORT=<your app port>
MONGO_DB_URI=<your mongodb database url>
JWT_SECRET=<your jwt token>
JWT_REFRESH_SECRET=<your refresh token key>

# Mistral AI Configuration
MISTRAL_API_KEY=<your Mistral AI key>
```

Remplacez les placeholders (e.g., `<your app port>`) par les valeurs réelles que vous souhaitez utiliser.

## Configuration de MongoDB

Assurez-vous que MongoDB est correctement installé et configuré sur votre machine. Vous pouvez utiliser MongoDB Compass
pour visualiser et gérer votre base de données de manière plus intuitive.

## Intégration de Mistral AI

Pour utiliser l'API de Mistral AI, vous devez [créer un compte](https://console.mistral.ai) et obtenir une clé d'API.

Incluez cette clé dans votre fichier `.env` comme indiqué précédemment.

## Démarrage de l'Application

Une fois toutes les configurations terminées, vous pouvez démarrer l'application en exécutant :

- **With npm**:

```bash
npm dev
```

- **Yarn**:

```bash
yarn dev
```

Cela lancera votre serveur sur le port spécifié dans le fichier `.env`, et l'application sera connectée à votre base de
données MongoDB.

## Technologies Utilisées

- **Hono**: Framework léger pour les applications web avec TypeScript.
- **TypeScript**: Langage de programmation typé superset de JavaScript.
- **Bcrypt**: Librairie pour le hachage de mots de passe.
- **Mongoose**: ODM (Object Data Modeling) pour MongoDB et Node.js.
- **Dotenv**: Module pour charger les variables d'environnement à partir d'un fichier `.env`.
- **OpenAI SDK**: Intégration du SDK d'OpenAI pour l'utilisation de modèles d'intelligence artificielle.
- **Zod**: Bibliothèque pour la validation de données en TypeScript.

---

Consultez régulièrement ce guide pour obtenir des mises à jour sur la configuration de votre projet IntellIA.
