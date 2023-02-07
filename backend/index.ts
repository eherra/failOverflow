import { PORT } from "./src/utils/config";
import app from "./src/app";
import logger from "./src/utils/logger";

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
