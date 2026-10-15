const express = require("express");
const router = express.Router();

const games = require("../data/games");

router.get("/", (req, res) => {
    const { cpu, gpu, ram, game } = req.query;

    const selectedGame = games.find((g) => g.id === game);

    if (
        typeof cpu !== "string" ||
        typeof gpu !== "string" ||
        cpu.trim() === "" ||
        gpu.trim() === "" ||
        !Number.isInteger(Number(ram)) ||
        Number(ram) < 1 ||
        !selectedGame
    ) {
        return res.status(400).send("Invalid PC specifications.");
    }

    const report = `
FrameForecast - PC Report

CPU: ${cpu}
GPU: ${gpu}
RAM: ${ram} GB
Game: ${selectedGame.name}

This report contains your submitted PC specifications.
`;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader(
        "Content-Disposition",
        'attachment; filename="FrameForecast-Report.txt"'
    );

    res.send(report);
});

module.exports = router;