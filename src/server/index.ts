import Express from "express";
import Mongoose from "mongoose";
import BodyParser from "body-parser";
import Passport from "passport";
import PassportJwt from "passport-jwt";
import AuthRouter from "@routes/auth";
import ApiRouter from "@routes/api";
import Path from "path";
import { Enviroment } from "@configs/enviroment";
import { getUserFromToken } from "@services/authentication";

const app = Express();
const databaseUrl = Enviroment.DatabaseUrl;
const connectionsOptions = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false };

app.use(Express.static("dist"));
app.use(Express.static("assets"));

app.use(Passport.initialize());
Passport.use(new PassportJwt.Strategy({
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Enviroment.JwtSecret
    }, getUserFromToken
));
app.use(BodyParser.json());
app.use("/auth", AuthRouter);
app.use("/api/v1", ApiRouter);

app.use("*", (_req, res) => {
    res.sendFile(Path.join(__dirname, `./../dist/index.html`));
});

app.use(((err, _req, res, _next) => {
    console.error(err);
    return res.sendFile(Path.join(__dirname, `./../dist/index.html`));
}) as Express.ErrorRequestHandler);

Mongoose.connect(databaseUrl!, connectionsOptions)
    .then(() => console.log(`Opened connection wih db`))
    .then(() => app.listen(
        Enviroment.Port, () => console.log(`Server is running on port ${Enviroment.Port}`)
    )).catch((err) => console.error("An error ocurred while startting web-server: ", err.message));
