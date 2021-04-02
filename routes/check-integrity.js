const express = require("express");
const router = express.Router();
const crypto = require("crypto");

router.post("/check-integrity", async (req, res) => {
  try {
    const plain = req.body.plain;
    const hash = req.body.hash;
    return res.json({ isIntegrity: crypto.createHash("sha256").update(JSON.stringify(plain)).digest("hex") === hash });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.toString());
  }
});

module.exports = router;
