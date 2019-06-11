import Express from "express";
import Photo from "@models/photo";

const router = Express.Router();

router.get("/", async (req, res) => {
    if (!req.params) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    let { offset, limit, sortAsc, widescreen } = req.params;
    const { query, category, owner } = req.params;
    let photos;
    offset = Number.parseInt(offset, 10);
    limit = Number.parseInt(limit, 10);
    sortAsc = Boolean(sortAsc);
    widescreen = Boolean(widescreen);
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

export default router;
