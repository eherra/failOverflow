import { MONGODB_URI } from "./utils/config";
import { PORT } from "./utils/config";
import app from "./app";
import logger from "./utils/logger";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

logger.info("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI as string)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error: any) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
