const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const axios = require("axios").default;
axios.defaults.baseURL = process.env.REST_API_URL;

const cors = require("cors");
app.use(cors());

app.use(require("./routes/decode-token"));
app.use(require("./routes/check-integrity"));
app.use(require("./routes/fetch-encrypt-data"));

app.listen(8003, () => {
  console.log("App listening on port 8003!");
});
