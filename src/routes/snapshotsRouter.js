const express = require("express");
const router = express.Router();
const getSnapshots = require("../controllers/snapshotController/snapshots");

// GET /api/snapshots?domain=example.com
router.get("/snapshots", getSnapshots);

module.exports = router;
