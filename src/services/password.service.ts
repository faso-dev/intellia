import * as bcrypt from 'bcrypt';

const PasswordService = {
    hash: (password: string) => {
        return bcrypt.hashSync(password, 10);
    },
    verify: (password: string, hashedPassword: string) => {
        return bcrypt.compareSync(password, hashedPassword);
    },
}

export {PasswordService};
