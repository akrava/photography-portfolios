import Dotenv from "dotenv";

Dotenv.config();

export namespace Enviroment {
    export const Port = process.env.PORT || 8080;
}
