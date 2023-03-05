require("dotenv").config({ path: "config/.env" });
require("./src/db/db-conn");
require("./src/redis/redis-conn");
const { json } = require("express");
const express = require("express");
const router = require("./src/router/router");
const cors = require("cors");
const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT, () => {
	console.log(`listening to port: ${process.env.PORT}`);
});
