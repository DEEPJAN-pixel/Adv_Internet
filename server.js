const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const games = [
    { id: "valorant", name: "Valorant", genre: "Competitive shooter" },
    { id: "cs2", name: "Counter-Strike 2", genre: "Competitive shooter" },
    { id: "cyberpunk", name: "Cyberpunk 2077", genre: "Open-world RPG" },
];

function page(title, body) {
    return `<!DOCTYPE html>
<html>
<head><title>${title}</title></head>
<body>${body}</body>
</html>`;
}
// Home page
app.get("/", (req, res) => {
    res.send(page("FrameForecast", `
    <h1>FrameForecast</h1>
    <p>Estimate your FPS and get the best settings for your PC.</p>
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

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});