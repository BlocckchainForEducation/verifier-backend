const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/decode-token", async (req, res) => {
  try {
    const decodedData = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    res.json(decodedData);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
