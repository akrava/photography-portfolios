import Express from "express";
import Photo from "@models/photo";

const router = Express.Router();

router.get("/", async (req, res) => {
    if (!req.params) {
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

function stringToBoolean(val: string) {
    return val === "true" ? true : val === "false" ? false : undefined;
}

export default router;
