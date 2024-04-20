import {z} from 'zod';


const RegisterUserSchema = z.object({
    username: z.string().min(
        3,
        "Le nom d'utilisateur doit contenir au moins 3 caractères"
    ).max(
        25,
        "Le nom d'utilisateur doit contenir au maximum 25 caractères"
    ),
    password: z.string().min(
        8,
        "Le mot de passe doit contenir au moins 8 caractères"
    ).max(
        50,
        "Le mot de passe doit contenir au maximum 50 caractères"
    ).regex(
        // au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/,
        "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
    ),
})

const LoginUserSchema = z.object({
    username: z.string().min(
        3,
        "Le nom d'utilisateur doit contenir au moins 3 caractères"
    ).max(
        25,
        "Le nom d'utilisateur doit contenir au maximum 25 caractères"
    ),
    password: z.string().min(
        8,
        "Le mot de passe doit contenir au moins 8 caractères"
    ).max(
        50,
        "Le mot de passe doit contenir au maximum 50 caractères"
    ),
});

const UpdateProfileSchema = z.object({
    lastName: z.string().min(
        3,
        "Le nom doit contenir au moins 3 caractères"
    ).max(
        50,
        "Le nom doit contenir au maximum 50 caractères"
    ),
    firstName: z.string().min(
        3,
        "Le prénom doit contenir au moins 3 caractères"
    ).max(
        50,
        "Le prénom doit contenir au maximum 50 caractères"
    ),
    email: z.string().email(
        "L'adresse email n'est pas valide"
    ),
});

const UpdatePasswordSchema = z.object({
    currentPassword: z.string().min(
        8,
        "Le mot de passe doit contenir au moins 8 caractères"
    ).max(
        50,
        "Le mot de passe doit contenir au maximum 50 caractères"
    ),
    newPassword: z.string().min(
        8,
        "Le mot de passe doit contenir au moins 8 caractères"
    ).max(
        50,
        "Le mot de passe doit contenir au maximum 50 caractères"
    ).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/,
        "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre"
    ),
})

type RegisterUserType = z.infer<typeof RegisterUserSchema>;
type LoginUserType = z.infer<typeof LoginUserSchema>;
type UpdateProfileType = z.infer<typeof UpdateProfileSchema>;
type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>;

export {
    RegisterUserSchema,
    LoginUserSchema,
    UpdateProfileSchema,
    UpdatePasswordSchema
}

export type {
    RegisterUserType,
    LoginUserType,
    UpdateProfileType,
    UpdatePasswordType
}
