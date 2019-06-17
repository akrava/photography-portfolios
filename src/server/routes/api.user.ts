import Express from "express";
import User from "@models/user";
import { authenticate } from "@services/authentication";

const router = Express.Router();

router.get("/me/ordered-photos", authenticate, async (req, res) => {
    if (!req.user) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    let user;
    try {
        user = await User.getAllOrderedImages(req.user.id);
    } catch (e) {
        res.status(400).send({ err: e.toString() });
        return;
    }
    if (user === null) {
        res.send(404);
        return;
    }
    res.send(user.ordered_photos);
});

router.post("/me/ordered-photos/:number(\\d+)", authenticate, async (req, res) => {
    if (!req.user || !req.params) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    let user;
    const number = Number.parseInt(req.params.number, 10);
    try {
        user = await User.orderPhoto(req.user.id, number);
    } catch (e) {
        res.status(400).send({ err: e.toString() });
        return;
    }
    if (user === null) {
        res.send(404);
        return;
    }
    res.status(201).send(user.ordered_photos);
});

export default router;
