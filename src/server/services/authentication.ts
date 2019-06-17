import Passport from "passport";
import Express from "express";
import User from "@models/user";
import { VerifyCallback } from "passport-jwt";

import crypto from "crypto";

export function cleanSensetiveUserInfo(user: User) {
    delete user.id;
    delete user.password;
}

export const getUserFromToken: VerifyCallback = async (jwtPayload, cb) => {
    if (!jwtPayload || !jwtPayload.id) {
        return cb(new Error("Couldn't get id from tocken"), null);
    }
    let user = null;
    try {
        user = await User.getById(jwtPayload.id);
    } catch (e) {
        return cb(e, null);
    }
    if (!user) {
        cb(null, false);
    } else {
        cb(null, user);
    }
};

export function authenticate(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) {
    if (!req.user) {
        const jwtAuthMiddleware = Passport.authenticate("jwt", { session: false });
        return jwtAuthMiddleware(req, res, next);
    }
    next();
}

// async function verifiyUserFunction(username, password, done) {
//     let user = null;
//     try {
//         user = await User.getByLogin(username);
//     } catch (e) {
//         return done(e, null);
//     }
//     if (!user) {
//         done(null, false);
//     } else if (user.password === Service.sha512(password, config.SaltHash)) {
//         done(null, user);
//     } else {
//         done(null, false);
//     }
// }

// function serializeUser(user, done) {
//     if (user && user.id && user.id instanceof mongoose.mongo.ObjectID) {
//         done(null, user.id.toString());
//     } else {
//         done(new Error("Couldn't get id of user"), null);
//     }
// }

// async function deserializeUser(id, done) {
//     let user = null;
//     try {
//         user = await User.getById(id);
//     } catch (e) {
//         return done(e, null);
//     }
//     if (!user) done(new Error("Such user not found"), null);
//     else done(null, user);
// }

export function sha512(password: string, salt: string) {
    const hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    return hash.digest("hex");
}

export function checkAuth(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) {
    if (!req.user) {
        res.status(401).send({ err: "Not authorized" });
        return;
    }
    next();
}

export const roleUser = 0;

export const roleAuthor = 1;

// export function checkAdmin(req, res, next) {
//     if (!req.user) return module.exports.sendErrorPage(res, 401, 'Not authorized', 'Увійдіть на сайт');
//     else if (req.user.role !== module.exports.roleAdmin)
//    return sendErrorPage(res, 403, 'Forbidden', 'У вас немає прав доступу');
//     else next();
// }
