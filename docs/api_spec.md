# Documentation API REST de IntellIA

## Authentification

### Login

- **Endpoint:** `/api/v1/auth/login`
- **Méthode:** POST
- **Payload:** `{ "username": "string", "password": "string" }`
- **Réponse:** `{ "token_type": "Bearer", "access_token": "string", "refresh_token": "string" }`
- **Statut HTTP:**
    - **200 OK:** Authentification réussie.
    - **401 Unauthorized:** Informations d'identification invalides.
    - **422 Unprocessable Entity:** Erreurs de validation des données.
    - **500 Internal Server Error:** Erreur interne du serveur.

### Register

- **Endpoint:** `/api/v1/auth/register`
- **Méthode:** POST
- **Payload:** `{ "username": "string", "password": "string" }`
- **Réponse:** `{ "message": "User registered successfully." }`
- **Statut HTTP:**
    - **201 Created:** Utilisateur enregistré avec succès.
    - **422 Unprocessable Entity:** Erreurs de validation des données.
    - **500 Internal Server Error:** Erreur interne du serveur.

### Refresh Token

- **Endpoint:** `/api/v1/auth/refresh-token`
- **Méthode:** POST
- **Payload:** `{ "refresh_token": "string" }`
- **Réponse:** `{ "token_type": "Bearer", "access_token": "string" }`
- **Statut HTTP:**
    - **200 OK:** Jeton rafraîchi avec succès.
    - **401 Unauthorized:** Jeton de rafraîchissement invalide ou expiré.
    - **500 Internal Server Error:** Erreur interne du serveur.

### Profile

- **Endpoint:** `/api/v1/auth/profile`
- **Méthode:** GET
- **Réponse:** `{ "item": IUser }`
- **Référence modèle:** [IUser Model](#iuser)
- **Authorization:** Requiert Bearer Token
- **Statut HTTP:**
    - **200 OK:** Profil utilisateur récupéré avec succès.
    - **401 Unauthorized:** Non autorisé.
    - **500 Internal Server Error:** Erreur interne du serveur.

## Conversations

### Liste des Conversations

- **Endpoint:** `/api/v1/conversations`
- **Méthode:** GET
- **Réponse:** `{ "items": IConversation[], "metadata": { "page": int, "limit": int, "total": int, "hasNextPage": bool, "hasPrevPage": bool, "nextPage": int, "prevPage": int } }`
- **Référence modèle:** [IConversation Model](#iconversation)
- **Authorization:** Requiert Bearer Token
- **Statut HTTP:**
    - **200 OK:** Conversations récupérées avec succès.
    - **401 Unauthorized:** Non autorisé.
    - **500 Internal Server Error:** Erreur interne du serveur.

### Création d'une Conversation

- **Endpoint:** `/api/v1/conversations`
- **Méthode:** POST
- **Payload:** `{ "subject": "string" }`
- **Réponse:** `{ "item": IConversation }`
- **Référence modèle:** [IConversation Model](#iconversation)
- **Authorization:** Requiert Bearer Token
- **Statut HTTP:**
    - **201 Created:** Conversation créée avec succès.
    - **422 Unprocessable Entity:** Erreurs de validation.
    - **500 Internal Server Error:** Erreur interne du serveur.

### Modification du Sujet d'une Conversation

- **Endpoint:** `/api/v1/conversations/:id`
- **Méthode:** PATCH
- **Payload:** `{ "title": "string" }`
- **Réponse:** `{ "item": IConversation }`
- **Référence modèle:** [IConversation Model](#iconversation)
- **Authorization:** Requiert Bearer Token
- **Statut HTTP:**
    - **200 OK:** Sujet modifié avec succès.
    - **401 Unauthorized:** Non autorisé.
    - **422 Unprocessable Entity:** Erreurs de validation.
    - **500 Internal Server Error:** Erreur interne du serveur.

### Liste des Messages

- **Endpoint:** `/api/v1/conversations/:id/messages`
- **Méthode:** GET
- **Réponse:** `{ "items": IMessage[], "metadata": { "page": int, "limit": int, "total": int, "hasNextPage": bool, "hasPrevPage": bool, "nextPage": int, "prevPage": int } }`
- **Référence modèle:** [IMessage Model](#imessage)
- **Authorization:** Requiert Bearer Token
- **Statut HTTP:**
    - **200 OK:** Messages récupérés avec succès.
    - **401 Unauthorized:** Non autorisé.
    - **500 Internal Server Error:** Erreur interne du serveur.

### Ajout d'un Message

- **Endpoint:** `/api/v1/conversations/:id/messages`
- **Méthode:** POST
- **Payload:** `{ "question": "string" }`
- **Réponse:** `{ "item": IMessage }`
- **Référence modèle:** [IMessage Model](#imessage)
- **Authorization:** Requiert Bearer Token
- **Statut HTTP:**
    - **201 Created:** Message ajouté avec succès.
    - **422 Unprocessable Entity:** Erreurs de validation.
    - **500 Internal Server Error:** Erreur interne du serveur.

## Traductions

### Liste des Traductions

- **Endpoint:** `/api/v1/translations`
- **Méthode:** GET
- **Réponse:** `{ "items": ITranslation[], "metadata": { "page": int, "limit": int, "total": int, "hasNextPage": bool, "hasPrevPage": bool, "nextPage": int, "prevPage": int } }`
- **Référence modèle:** [ITranslation Model](#itranslation)
- **Authorization:** Requiert Bearer Token
- **Statut HTTP:**
    - **200 OK:** Traductions récupérées avec succès.
    - **401 Unauthorized:** Non autorisé.
    - **500 Internal Server Error:** Erreur interne du serveur.

### Création d'une Traduction

- **Endpoint:** `/api/v1/translations`
- **Méthode:** POST
- **Payload:** `{ "content": "string", "contentType": "text", "sourceLanguage": "fr" | "en" | "de", "targetLanguage": "fr" | "en" | "de" }`
- **Réponse:** `{ "item": ITranslation }`
- **Référence modèle:** [ITranslation Model](#itranslation)
- **Authorization:** Requiert Bearer Token
- **Statut HTTP:**
    - **201 Created:** Traduction créée avec succès.
    - **422 Unprocessable Entity:** Erreurs de validation.
    - **500 Internal Server Error:** Erreur interne du serveur.

---

## Modèles de Données

### <a name="iuser"></a>IUser

```typescript
export interface IUser extends Document {
    username: string;
    password: string;
    role: "ROLE_USER" | "ROLE_ADMIN";
    avatar?: string;
    lastName?: string;
    firstName?: string

;
    phoneNumber?: string;
    refreshToken?: string;
    country?: string;
    email?: string;
    activated: boolean;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
```

### <a name="iconversation"></a>IConversation

```typescript
export interface IConversation extends Document {
    subject: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
```
### <a name="imessage"></a>IMessage

```typescript
export interface IMessage extends Document {
    conversationId: string;
    userQuestion: string;
    assistantReply: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
```

### <a name="itranslation"></a>ITranslation

```typescript
export interface ITranslation extends Document {
    userId: string;
    sourceLang: string;
    targetLang: string;
    sourceContent: string;
    targetContent: string;
    contentType: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
```
