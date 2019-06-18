import Express from "express";
import User from "@models/user";
import { authenticate } from "@services/authentication";

const router = Express.Router();

router.get("/portfolios", async (req, res) => {
    if (!req.query) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    let { offset, limit, category } = req.query;
    const { query } = req.query;
    let users;
    offset = Number.parseInt(offset, 10);
    limit = Number.parseInt(limit, 10);
    category = category && category.split(",");
    try {
        users = await User.getAll(offset, limit, true, category, query);
    } catch (e) {
        res.status(400).send({ err: e.toString() });
        return;
    }
    res.send(users);
});

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

router.get("/:login([A-Za-z_0-9]+)", async (req, res) => {
    if (!req.params) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    const { login } = req.params;
    let user;
    try {
        user = await User.getByLogin(login);
    } catch (e) {
        res.status(400).send({ err: e.toString() });
        return;
    }
    res.send(user);
});

export default router;
