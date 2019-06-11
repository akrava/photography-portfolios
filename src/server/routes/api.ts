import Express from "express";
import ApiUserRouter from "@routes/api.user";
import ApiPhotoRouter from "@routes/api.photo";
import ApiArtistRouter from "@routes/api.artist";

const router = Express.Router();

router.use("/user", ApiUserRouter);
router.use("/photo", ApiPhotoRouter);
router.use("/artist", ApiArtistRouter);

export default router;
