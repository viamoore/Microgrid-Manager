import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import routes from "./routes";
import HttpException from "./models/http-exception.model";

// import mysql from 'mysql2/promise';
// import * as pgPromise from 'pg-promise';

// import { RowDataPacket } from 'mysql2/promise';

export const createServer = (): Express => {
  const app = express();

  app
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(routes);

  app.get("/", (req: Request, res: Response) => {
    res.json({ status: "API is running" });
  });

  /* eslint-disable */
  app.use(
    (
      err: Error | HttpException,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      // @ts-ignore
      if (err && err.errorCode) {
        // @ts-ignore
        res.status(err.errorCode).json(err.message);
      } else if (err) {
        res.status(500).json(err.message);
      }
    }
  );

  return app;
};
