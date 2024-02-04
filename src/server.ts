import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./config/mongo";
import app from "./app";
import logger from "./utils/logger";
import swaggerDocs from "./utils/swagger/swagger";

connectDatabase();

const PORT: string | number = process.env.PORT ?? 8000;

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
  swaggerDocs(app, PORT);
});
