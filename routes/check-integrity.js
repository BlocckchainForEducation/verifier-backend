const express = require("express");
const router = express.Router();
const sawtoothCli = require("./sawtooth-cli");

router.post("/check-integrity", async (req, res) => {
  try {
    // const body = req.body;
    // const txInfo = await sawtoothCli.getTxInfo(body.txid, body.address);
    // if (!txInfo.ok) return res.json({ valid: false, msg: "The tx does not exists!" });

    // if (checkIntegrity(req.body.plain, txInfo.cipher, req.body.publicKeyHex)) {
    //   res.json({ valid: true, timestamp: txInfo.timestamp });
    // } else {
    //   res.json({ valid: false, msg: "Not integrity!" });
    // }

    const randTime = 1500 + Math.floor(Math.random() * 1500);
    const randErr = 1500 + Math.floor(Math.random() * 1500);
    const inValid = randTime % 8 == 0;
    const randomErrMsg = randErr % 2 == 0 ? "Not integrity!" : "Not found tx!";
    if (inValid) {
      setTimeout(() => res.json({ valid: false, msg: randomErrMsg }), randTime);
    } else {
      setTimeout(() => res.json({ valid: true, timestamp: Date.now() }), randTime);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// TODO: implement check here
function checkIntegrity(plain, cipher, publicKeyHex) {
  return true;
}

module.exports = router;
