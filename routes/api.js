const express = require("express");
const router = express.Router();
const path = require("path");

// Send website name to the course hub
router.get("/getName", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    res.json({
        name: "FrameForecast"
    });
});

// Send website banner to the course hub
router.get("/getImage", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    res.sendFile(
        path.join(__dirname, "../public/banner.png")
    );
});

module.exports = router;