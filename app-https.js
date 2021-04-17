const express = require("express");
const app = express();
const https = require("https");
var fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const axios = require("axios").default;
axios.defaults.baseURL = process.env.REST_API_URL;

const cors = require("cors");
app.use(cors());

app.use(require("./routes/decode-token"));
app.use(require("./routes/check-integrity"));
app.use(require("./routes/fetch-encrypt-data"));

const PORT = process.env.PORT || 8000;

https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/verifier-backend.b4e.vn/privkey.pem"), // bind
      cert: fs.readFileSync("/etc/letsencrypt/live/verifier-backend.b4e.vn/fullchain.pem"), // bind
    },
    app
  )
  .listen(PORT, () => {
    console.log(`B4E Verifier Backend listening on port ${PORT}!`);
  });
