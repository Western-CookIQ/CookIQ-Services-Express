const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./utils/db");

require("dotenv").config(); // for express to parse env files

// app config
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("main"));

// routes
require("./routes/auth.routes.js")(app);
require("./routes/client.routes.js")(app);
require("./routes/meal.routes.js")(app);
require("./routes/recipe.routes.js")(app);
require("./routes/recipetag.routes.js")(app);
require("./routes/tag.routes.js")(app);
require("./routes/recommendations.routes.js")(app);

const PORT = process.env.NODE_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
