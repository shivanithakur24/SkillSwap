const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({ url: req.file.path });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
