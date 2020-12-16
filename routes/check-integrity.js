const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const ecies = require("ecies-geth");

router.post("/check-integrity", async (req, res) => {
  try {
    const publicKeyHex65 = req.body.publicKeyHex65;
    const plain = req.body.plain;
    const txid = req.body.txid;

    try {
      const response = await axios.get("/record/" + txid);
      if (response.data.ok) {
        const cipherOnBkc = response.data.cipher;
        const timestamp = response.data.timestamp;
        if (await checkIntegrity(plain, cipherOnBkc, publicKeyHex65)) {
          res.json({ valid: true, timestamp: timestamp });
        } else {
          res.json({ valid: false, msg: "Not integrity!" });
        }
      } else {
        res.json({ valid: false, msg: "The tx does not exists!" });
      }
    } catch (error) {
      if (error.response) return res.status(502).json({ msg: error.response.data.error });
      else return res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error.toString());
  }
});

async function checkIntegrity(plain, cipherOnBkc, publicKeyHex65) {
  const cipher = (await ecies.encrypt(Buffer.from(publicKeyHex65, "hex"), Buffer.from(JSON.stringify(plain)))).toString("hex");
  return cipher === cipherOnBkc;
}

module.exports = router;
