import { NextFunction, Request, Response, Router } from "express";
import db from "../../db";

interface Config {
  devicename: string;
  permission_username: string;
  permission_password: string;
  outlink: string;
  devicestatus: boolean;
}

let solarkconfig: Config = {
  devicename: "Solar device name",
  permission_username: "",
  permission_password: "",
  outlink: "",
  devicestatus: false,
};

let egaugeconfig: Config = {
  devicename: "Solar device name",
  permission_username: "",
  permission_password: "",
  outlink: "",
  devicestatus: false,
};

const router = Router();

async function update(insertQuery: any, dataToInsert: any) {
  try {
    // Execute the insert query with the data
    const [result] = await db.query(insertQuery, dataToInsert);

    console.log("Data update successfully:", result);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

/**
 * Function description
 * @route {GET} /config/solArk
 * @returns ?
 */
router.get(
  "/config/solArk",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(solarkconfig);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Function description
 * @route {PUT} /config/solArk
 * @returns ?
 */
router.put(
  "/configsolark",
  function getkitchen(req: Request, res: Response, next: NextFunction) {
    try {
      solarkconfig = {
        devicename: req.query?.devicename as string,
        permission_username: req.query?.permission_username as string,
        permission_password: req.query?.permission_password as string,
        outlink: req.query?.outlink as string,
        devicestatus: req.query?.devicestatus == "true" ? true : false,
      };
      res.json("config sol ark success");
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Function description
 * @route {GET} /config/eGauge
 * @returns ?
 */
router.get(
  "/config/eGauge",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(egaugeconfig);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Function description
 * @route {PUT} /config/eGauge
 * @returns ?
 */
router.put(
  "/config/eGauge",
  function getkitchen(req: Request, res: Response, next: NextFunction) {
    try {
      egaugeconfig = {
        devicename: req.query?.devicename as string,
        permission_username: req.query?.permission_username as string,
        permission_password: req.query?.permission_password as string,
        outlink: req.query?.outlink as string,
        devicestatus: req.query?.devicestatus == "true" ? true : false,
      };
      res.send("config eGauge success");
    } catch (err) {
      next(err);
    }
  }
);

export default router;
