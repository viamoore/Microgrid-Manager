import { NextFunction, Request, Response, Router } from "express";

const router = Router();

interface dashboardConfig {
  refreshRate: number;
}

let dashboard: dashboardConfig = {
  refreshRate: 10,
};

/**
 * Function description
 * @route {GET} /settings
 * @returns ?
 */
router.get(
  "/settings",
  function getkitchen(req: Request, res: Response, next: NextFunction) {
    try {
      res.json("dashboard config GET: " + JSON.stringify(dashboard));
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Function description
 * @route {PUT} /settings
 * @returns ?
 */
router.put(
  "/settings",
  function getkitchen(req: Request, res: Response, next: NextFunction) {
    try {
      dashboard = {
        refreshRate: parseInt(req.params.refreshRate),
      };
      res.json("dashboard config PUT success");
    } catch (err) {
      next(err);
    }
  }
);

export default router;
