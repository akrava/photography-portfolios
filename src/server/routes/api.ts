import Express from "express";
import ApiUserRouter from "@routes/api.user";
import ApiPhotoRouter from "@routes/api.photo";

const router = Express.Router();

router.use("/user", ApiUserRouter);
router.use("/photo", ApiPhotoRouter);

export default router;
