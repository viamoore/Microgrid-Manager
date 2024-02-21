import dotenv from "dotenv";
import { createServer } from "./server";

dotenv.config();

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
  console.log(
    `⚡️[server]: Microgrid Server is running at http://localhost:${port}`
  );
});
