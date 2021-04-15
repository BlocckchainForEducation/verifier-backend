const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` }); docker compose env_file will provide env variable
const axios = require("axios").default;
// axios.defaults.baseURL = process.env.REST_API_URL;
axios.defaults.baseURL = process.env.STUDENT_API_PROVIDER;

const cors = require("cors");
app.use(cors());

app.use(require("./routes/decode-token"));
app.use(require("./routes/check-integrity"));
app.use(require("./routes/fetch-encrypt-data"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
