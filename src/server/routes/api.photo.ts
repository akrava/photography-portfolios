import Express from "express";
import Photo from "@models/photo";

const router = Express.Router();

router.get("/", async (req, res) => {
    if (!req.query) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    let { offset, limit, sortAsc, widescreen, category } = req.query;
    const { query, owner } = req.query;
    let photos;
    offset = Number.parseInt(offset, 10);
    limit = Number.parseInt(limit, 10);
    sortAsc = stringToBoolean(sortAsc);
    widescreen = stringToBoolean(widescreen);
    category = category && category.split(",");
    try {
        photos = await Photo.getAll(
            offset, limit, sortAsc, query, category, widescreen, owner
        );
    } catch (e) {
        res.status(400).send({ err: e.toString() });
        return;
    }
    res.send(photos);
});

router.get("/:number(\\d+)", async (req, res) => {
    if (!req.params) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    const number = Number.parseInt(req.params.number, 10);
    let photo;
    try {
        photo = await Photo.getByNumber(number);
    } catch (e) {
        res.status(400).send({ err: e.toString() });
        return;
    }
    if (photo === null) {
        res.send(404);
        return;
    }
    res.send(photo);
});

function stringToBoolean(val: string) {
    return val === "true" ? true : val === "false" ? false : undefined;
}

export default router;
