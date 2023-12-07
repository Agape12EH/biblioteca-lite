import app from "./app.js";
import { config } from "./config.js";


//inicialisacion no solo para saber en que puerto corre OJO
app.listen(config.PORT, () => {
  console.log(`Server on http://localhost:${config.PORT}`);
});