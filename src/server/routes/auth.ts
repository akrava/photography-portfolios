import { Enviroment } from "@configs/enviroment";
import Express from "express";
import jwt from "jsonwebtoken";
import User from "@models/user";
import { cleanSensetiveUserInfo, sha512 } from "@services/authentication";

const router = Express.Router();

router.post("/register", async (req, res) => {
    const loginRegExPattern = /[A-Za-z_0-9]{5,20}/;
    if (!req.body) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    const login = req.body.username;
    if (!login || !login.match(loginRegExPattern)) {
        res.status(400).send({ err: "Invalid login" });
        return;
    }
    const password = req.body.password;
    if (!password || password.length < 8 || password.length > 30) {
        res.status(400).send({ err: "Invalid password" });
        return;
    }
    const fullname = req.body.fullname ? req.body.fullname.trim() : null;
    if (!fullname || fullname.length < 3 || fullname.length > 30) {
        res.status(400).send({ err: "Invalid fullname." });
        return;
    }
    const isPhotographer = req.body.isPhotographer === true;
    const user = new User(
        "", login, sha512(password, Enviroment.PasswordSalt!), "photographer",
        !isPhotographer, fullname
    );
    let createdUser;
    try {
        const id = await User.insert(user);
        createdUser = await User.getById(id);
    } catch (e) {
        res.status(400).send({ err: e.toString() });
        return;
    }
    res.status(201).send({ user: createdUser });
});

router.post("/login", async (req, res) => {
    const loginRegExPattern = /[A-Za-z_0-9]{5,20}/;
    const login = req.body.username;
    if (!login || !login.match(loginRegExPattern)) {
        res.status(400).send({ err: "Invalid login" });
        return;
    }
    const password = req.body.password;
    if (!password || password.length < 8 || password.length > 30) {
        res.status(400).send({ err: "Invalid password" });
        return;
    }
    let user: User | null;
    try {
        user = await User.getByLogin(login);
        if (user === null
            || user.password !== sha512(password, Enviroment.PasswordSalt!)) {
            throw Error("Username or password are invalid");
        }
    } catch (e) {
        res.status(400).send({ err: e.toString() });
        return;
    }
    const token = jwt.sign({ id: user!.id }, Enviroment.JwtSecret!);
    cleanSensetiveUserInfo(user!);
    return res.json({ user: user!, token });
});

export default router;
