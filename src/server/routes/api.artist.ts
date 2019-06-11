import Express from "express";

const router = Express.Router();

router.get("/d", (req, res) => {
    console.log(req, res);
});

export default router;
