
export const jwtConstants = () => {
    return {
        "JWT_TOKEN": "ELPROGRAMADORNINJA1115!",
        "JWT_EXPIRATION_TIME": '2h'
    }
}

export const verificaPassword = (newPassword: string, oldPassword: string) => {
    const bcrypt = require('bcrypt');
    return bcrypt.compareSync(newPassword, oldPassword);
}

export const encriptarPassword = (newPassword: string) => {
    const bcrypt = require('bcrypt');
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(newPassword, salt);
}