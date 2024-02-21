import { NextFunction, Request, Response, Router } from "express";
import { getPowerView } from "./powerView.services";

const router = Router();

/**
 * Powerview battery charge get
 * @route {GET} /powerView
 * @returns ?
 */
router.get(
  "/powerView",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.setHeader("Content-Type", "text/event-stream");
      await getPowerView(res);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
