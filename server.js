const express = require("express");

const app = express();

app.use("/public", express.static("public"));

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const games = [
    { id: "valorant", name: "Valorant", genre: "Competitive shooter" },
    { id: "cs2", name: "Counter-Strike 2", genre: "Competitive shooter" },
    { id: "cyberpunk", name: "Cyberpunk 2077", genre: "Open-world RPG" },
];

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function page(title, body) {
    return `<!DOCTYPE html>
<html>
<head>
<title>${title}</title>
<link rel="stylesheet" href="/public/style.css">
</head>
<body>${body}</body>
</html>`;
}
// Home page
app.get("/", (req, res) => {
    res.send(page("FrameForecast", `
        <h1>FrameForecast</h1>
        <p>Estimate your FPS and get the best settings for your PC.</p>

        <h2>Enter Your PC Specifications</h2>

        <form id="pcForm" action="/analyze" method="POST">
            <label>CPU:</label>
            <input type="text" name="cpu" required>

            <br><br>

            <label>GPU:</label>
            <input type="text" name="gpu" required>

            <br><br>

            <label>RAM (GB):</label>
            <input type="number" name="ram" min="1" required>

            <br><br>

            <label>Select Game:</label>
            <select name="game">
                <option value="valorant">Valorant</option>
                <option value="cs2">Counter-Strike 2</option>
                <option value="cyberpunk">Cyberpunk 2077</option>
            </select>

            <br><br>

            <button type="submit">Analyze PC</button>
        </form>
        <div id="results"></div>
<script src="/public/script.js"></script>

        <p><a href="/games">Browse games</a></p>
    `));
});

// List page: the HTML is built from data, so it is dynamic.
app.get("/games", (req, res) => {
    const items = games
        .map((g) => `<li><a href="/games/${g.id}">${g.name}</a> (${g.genre})</li>`)
        .join("");
    res.send(page("Games", `<h1>Games</h1><ul>${items}</ul><p><a href="/">Home</a></p>`));
});

// Route parameter: ":gameId" matches any value, e.g. /games/cs2 gives req.params.gameId === "cs2"
app.get("/games/:gameId", (req, res) => {
    const game = games.find((g) => g.id === req.params.gameId);

    if (!game) {
        return res.status(404).send(page("Not found", `<h1>We don't have that game</h1><p><a href="/games">Back to the list</a></p>`));
    }

    res.send(page(game.name, `
    <h1>${game.name}</h1>
    <p>${game.genre}</p>
    <p><a href="/games">Back to the list</a></p>
  `));
});

app.post("/analyze", (req, res) => {
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

app.get("/download", (req, res) => {
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

// Custom 404 handler
app.use((req, res) => {
    res.status(404).send(page("404 - Not Found", `
        <h1>404 - Page Not Found</h1>
        <p>The page you requested does not exist.</p>
        <p><a href="/">Back to FrameForecast</a></p>
    `));
});

// Custom 500 error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).send(page("500 - Server Error", `
        <h1>500 - Internal Server Error</h1>
        <p>Something went wrong on our server.</p>
        <p><a href="/">Back to FrameForecast</a></p>
    `));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});