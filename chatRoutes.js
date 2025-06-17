const express = require("express");
const router = express.Router();

// Example GET route
router.get("/", (req, res) => {
  res.send("Chat API working!");
});

module.exports = router;
