import { NextFunction, Request, Response, Router } from "express";
import db from "../../db";
import { parseRows } from "../../lib";
import type { RateData } from "../../generics";

const router = Router();

/**
 * Function description
 * @route {GET} /weather
 * @returns ?
 */
router.get(
  "/weather",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let query = `
        SELECT *
        FROM weather_data 
        ORDER BY startTime DESC 
        LIMIT 1;
      `;
      const [rows] = parseRows<RateData[]>(await db.execute(query));
      res.json(rows);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
