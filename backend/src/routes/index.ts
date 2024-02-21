import { Router } from "express";
import eGaugeController from "./eGauge/eGauge.controller";
import powerViewController from "./powerView/powerView.controller";
import weatherController from "./weather/weather.controller";
import deviceConfig from "./config/config.controller";
import dashboardConfig from "./config/config.dashboard.controller";

const api = Router()
  .use(eGaugeController)
  .use(powerViewController)
  .use(weatherController)
  .use(deviceConfig)
  .use(dashboardConfig);

export default Router().use("/", api);
