const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const axios = require("axios").default;
axios.defaults.baseURL = process.env.REST_API_URL;

const cors = require("cors");
app.use(cors());

const decoder = require("./routes/decode-token");
app.use(decoder);

const checker = require("./routes/check-integrity");
app.use(checker);

app.listen(8002, () => {
  console.log("App listening on port 8002!");
});
