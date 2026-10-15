const express = require("express");
const router = express.Router();

const games = require("../data/games");
const page = require("../utils/page");

// Display all supported games
router.get("/", (req, res) => {
    const items = games
        .map((g) => `<li><a href="/games/${g.id}">${g.name}</a> (${g.genre})</li>`)
        .join("");

    res.send(page("Games", `
        <h1>Games</h1>
        <ul>${items}</ul>
        <p><a href="/">Home</a></p>
    `));
});

// Display an individual game
router.get("/:gameId", (req, res) => {
    const game = games.find((g) => g.id === req.params.gameId);

    if (!game) {
        return res.status(404).send(page("Not found", `
            <h1>We don't have that game</h1>
            <p><a href="/games">Back to the list</a></p>
        `));
    }

    res.send(page(game.name, `
        <h1>${game.name}</h1>
        <p>${game.genre}</p>
        <p><a href="/games">Back to the list</a></p>
    `));
});

module.exports = router;