import { MONGODB_URI_ATLAS } from "./utils/config";
import { PORT } from "./utils/config";
import app from "./app";
import logger from "./utils/logger";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

logger.info("connecting to MongoDB");
mongoose
  .connect(MONGODB_URI_ATLAS as string) // if u prefer using Docker Atlas
  //.connect(MONGODB_URI_DOCKER as string) // if you prefer using mongoDB docker image
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error: any) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
