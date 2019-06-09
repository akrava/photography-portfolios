import { Enviroment } from "@configs/enviroment";
import Express from "express";
import Passport from "passport";
import jwt from "jsonwebtoken";
import User from "@models/user";
import { cleanSensetiveUserInfo, checkAuth, sha512, roleUser } from "@services/authentication";

const router = Express.Router();

router.post("/register", async (req, res) => {
    const loginRegExPattern = /[A-Za-z_0-9]{5,20}/;
    if (!req.body) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    const login = req.body.login;
    if (!login || !login.match(loginRegExPattern)) {
        res.status(400).send({ err: "Invalid login" });
        return;
    }
    const pasword = req.body.pasw;
    if (pasword.length < 8 || pasword.length > 30) {
        res.status(400).send({ err: "Invalid password" });
        return;
    }
    const fullname = req.body.fullname ? req.body.fullname.trim() : null;
    if (!fullname || fullname.length < 3 || fullname.length > 30) {
        res.status(400).send({ err: "Invalid fullname." });
        return;
    }
    const email = req.body.email ? req.body.email.toLowerCase().trim() : null;
    if (!email) {
        res.status(400).send({ err: "Invalid email" });
        return;
    }
    const user = new User(
        "", login, sha512(pasword, Enviroment.PasswordSalt!),
        roleUser, fullname, email
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

router.post("/login", (req, res) => {
    Passport.authenticate("local", { session: false }, (err, user) => {
        if (user === false) {
            res.status(401).send({
                message: `Username or password doesn't match`
            });
            return;
        } else if (err || !user) {
            res.status(400).send({
                message: `Something is not right: ${err}`
            });
            return;
        }
        req.login(user, { session: false }, (e) => {
            if (e) {
                return res.send({  message: e });
            }
            const token = jwt.sign({ id: user.id }, Enviroment.JwtSecret!);
            cleanSensetiveUserInfo(user);
            return res.json({ user, token });
        });
    })(req, res);
});

router.post("/logout", checkAuth, (req) => {
    req.logout();
});

export default router;
