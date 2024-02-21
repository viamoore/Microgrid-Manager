import { Response } from "express";
import db from "../../db";
import { parseRows } from "../../lib";

import type { PowerViewData } from "./powerView.model";

// Powerview SSE call
export async function getPowerView(res: Response) {
  let q = `
        SELECT *
        FROM powerview_data 
        ORDER BY updateAt DESC LIMIT 1;
    `;
  const [rows] = await db.execute(q);
  const val = parseRows<PowerViewData[]>(rows)[0];

  const data: PowerViewData = {
    pac: val.pac,
    toGrid: val.toGrid,
    gridTo: val.gridTo,
    soc: val.soc,
    status: val.status,
    battPower: val.battPower,
    gridOrMeterPower: val.gridOrMeterPower,
  };

  res.write(`data: ${JSON.stringify(data)}\n\n`);

  setTimeout(() => getPowerView(res), 5 * 60 * 1000); // 5 minutes
}
