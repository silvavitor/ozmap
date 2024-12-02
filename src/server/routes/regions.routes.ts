import * as express from "express";
import {
  createRegion,
  deleteRegion,
  findRegionByCoordinates,
  findRegionByCoordinatesDistance,
  findRegionById,
  getRegions,
  updateRegion,
} from "../handlers/region.handlers";

const router = express.Router();

router.post("/", createRegion);
router.get("/", getRegions);
router.get("/coordinates/distance", findRegionByCoordinatesDistance);
router.get("/coordinates", findRegionByCoordinates);
router.get("/:id", findRegionById);
router.patch("/:id", updateRegion);
router.delete("/:id", deleteRegion);

export default router;
