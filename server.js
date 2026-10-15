const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Website Routes
app.use("/", require("./routes/home")); // route for home
app.use("/games", require("./routes/games")); // route for games
app.use("/analyze", require("./routes/analyze")); // route for analyses
app.use("/download", require("./routes/download")); // route for download


// Custom 404 handler
const page = require("./utils/page"); // route for pages

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