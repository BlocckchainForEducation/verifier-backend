const express = require("express");
const router = express.Router();
const { hashObject } = require("./utils");

router.post("/check-integrity", async (req, res) => {
  try {
    console.log({ plainHash: hashObject(req.body.plain), bkchash: req.body.hash });
    return res.json({ isIntegrity: hashObject(req.body.plain) === req.body.hash });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.toString());
  }
});

module.exports = router;
