const express = require("express");
const router = express.Router();
const axios = require("axios").default;

router.get("/student/data/:publicKeyHex", async (req, res) => {
  try {
    const publicKeyHex = req.params.publicKeyHex;
    try {
      const response = await axios.get("/student/data/" + publicKeyHex);
      return res.json(response.data);
    } catch (error) {
      console.error(error);
      if (error.response) return res.status(502).send(error.response.data.error);
      else return res.status(502).send(error.toString());
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.toString());
  }
});

module.exports = router;
