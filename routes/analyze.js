const express = require("express");
const router = express.Router();

const games = require("../data/games");
const page = require("../utils/page");

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// PC Analyzer page
router.get("/", (req, res) => {
    res.send(page("Analyze My PC - FrameForecast", `
        <section class="page-intro">
            <p class="eyebrow">FRAMEFORECAST ANALYZER</p>
            <h1>ANALYZE <span>YOUR PC.</span></h1>
            <p>Enter your PC specifications and select a game.</p>
        </section>

        <section class="analyzer-panel">
            <h2>YOUR PC SPECIFICATIONS</h2>

            <form id="pcForm" action="/analyze" method="POST">
                <div class="form-grid">

                    <div class="form-field">
                        <label for="cpu">Processor (CPU)</label>
                        <input type="text" id="cpu" name="cpu"
                            placeholder="e.g. Intel i5-11400H" required>
                    </div>

                    <div class="form-field">
                        <label for="gpu">Graphics Card (GPU)</label>
                        <input type="text" id="gpu" name="gpu"
                            placeholder="e.g. GTX 1650" required>
                    </div>

                    <div class="form-field">
                        <label for="ram">RAM (GB)</label>
                        <input type="number" id="ram" name="ram"
                            min="1" placeholder="16" required>
                    </div>

                    <div class="form-field">
                        <label for="game">Select Game</label>
                        <select id="game" name="game">
                            <option value="valorant">Valorant</option>
                            <option value="cs2">Counter-Strike 2</option>
                            <option value="cyberpunk">Cyberpunk 2077</option>
                        </select>
                    </div>

                </div>

                <button type="submit" class="btn">
                    ANALYZE MY PC →
                </button>
            </form>

            <div id="results"></div>
        </section>

        <script src="/public/script.js"></script>
    `));
});


router.post("/", (req, res) => {
    const { cpu, gpu, ram, game } = req.body;

    if (
        typeof cpu !== "string" ||
        typeof gpu !== "string" ||
        cpu.trim() === "" ||
        gpu.trim() === "" ||
        !Number.isInteger(Number(ram)) ||
        Number(ram) < 1
    ) {
        return res.status(400).send("Invalid PC specifications.");
    }

    const selectedGame = games.find((g) => g.id === game);

    if (!selectedGame) {
        return res.status(400).send(page("Invalid Game", `
            <h1>Invalid game selected</h1>
            <p><a href="/">Try again</a></p>
        `));
    }

    res.send(`
        <h1>FrameForecast - PC Analysis</h1>

        <p><strong>CPU:</strong> ${escapeHTML(cpu)}</p>
        <p><strong>GPU:</strong> ${escapeHTML(gpu)}</p>
        <p><strong>RAM:</strong> ${escapeHTML(ram)} GB</p>
        <p><strong>Game:</strong> ${selectedGame.name}</p>

        <p>Your PC specifications were submitted successfully.</p>

        <p><a href="/">Analyze another PC</a></p>
    `);
});

module.exports = router;