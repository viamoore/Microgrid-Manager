import { Response } from "express";

import db from "../../db";
import { parseRows } from "../../lib";

import type { EGaugeData } from "./eGauge.model";
import type { RateData } from "../../generics";

// egauge serversent event, get, put
export async function periodicKitchen(res: Response) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM rate ORDER BY time DESC LIMIT 1;"
    );
    const val = parseRows<RateData[]>(rows)[0];
    const data: EGaugeData = {
      source: "egauge",
      S4_L2: val.S4_L2,
      S3_L1: val.S3_L1,
      S6_L2: val.S6_L2,
      S5_L1: val.S5_L1,
      S2_L1: val.S2_L1,
      S1_L1: val.S1_L1,
      S8_L2: val.S8_L2,
      S7_L1: val.S7_L1,
      S10_L2: val.S10_L2,
      S9_L1: val.S9_L1,
      S12_L2: val.S12_L2,
      S11_L1: val.S11_L1,
      dateTime: val.time,
    };
    // console.log(data)
    res.write("data:" + `${JSON.stringify(data)}\n\n`);
    setTimeout(() => periodicKitchen(res), 1000);
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error gracefully, e.g., send an error response to the client
    res.status(500).send("An error occurred");
  }
}

// powerview get last 30s/1m/30m/1h kitchen
export async function eGaugeTime(query: any) {
  const time = query?.time as string;
  const dataname = query?.dataname as string;

  let q = ``;
  if (time.charAt(time.length - 1) == "s") {
    q = `
        SELECT ${dataname}, time
        FROM rate
        where time>= NOW() - INTERVAL 28800 + ? SECOND;
      `;
  } else if (time.charAt(time.length - 1) == "m") {
    q = `
        SELECT ${dataname}, time
        FROM rate
        where time>= NOW() - INTERVAL 480 + ? MINUTE;
      `;
  } else {
    q = `
        SELECT ${dataname}, time
        FROM rate
        where time>= NOW() - INTERVAL 8 + ? HOUR;
      `;
  }
  const [rows] = parseRows<RateData[]>(
    await db.execute(q, [time.slice(0, -1)])
  );

  // console.log(rows)
  return rows;
}

// powerview get start and end timestamp
export async function eGaugePeriod(query: any) {
  const start = query?.start as string;
  const end = query?.end as string;
  const dataname = query?.dataname as string;

  let q = `
    SELECT ${dataname}
    FROM rate
    WHERE time BTWEEN "${start}" AND "${end}"
    `;
  const [rows] = parseRows<RateData[]>(await db.execute(q));

  // console.log(rows)
  return rows;
}
