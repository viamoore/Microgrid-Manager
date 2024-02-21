import { NextFunction, Request, Response, Router } from "express";
import { eGaugeTime, eGaugePeriod, periodicKitchen } from "./eGauge.service";

const router = Router();

/**
 * Function description
 * @route {GET} /eGauge
 * @returns ?
 */
router.get(
  "/eGauge",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.setHeader("Content-Type", "text/event-stream");
      await periodicKitchen(res);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Function description
 * @route {GET} /eGauge/time
 * @returns ?
 */
router.get(
  "/eGauge/time",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await eGaugeTime(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Function description
 * @route {GET} /eGauge/period
 * @returns ?
 */
router.get(
  "/eGauge/period",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await eGaugePeriod(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
