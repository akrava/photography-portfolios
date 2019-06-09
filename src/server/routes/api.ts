import Express from "express";
import ApiUserRouter from "@routes/api.user";

const router = Express.Router();

router.use(ApiUserRouter);

export default router;
