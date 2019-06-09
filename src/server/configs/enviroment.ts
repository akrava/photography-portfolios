import Dotenv from "dotenv";

Dotenv.config();

export namespace Enviroment {
    export const Port = process.env.PORT || 8080;
    export const DatabaseUrl = process.env.DATABASE_URL;
    export const PasswordSalt = process.env.PASSWORD_SALT;
    export const JwtSecret = process.env.JWT_SECRET;
}
