function page(title, body) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/public/style.css">
</head>
<body>
    <header class="site-header">
        <a href="/" class="logo">FRAME<span>FORECAST</span></a>

        <nav>
            <a href="/">Home</a>
            <a href="/games">Games</a>
            <a href="/analyze">Analyze PC</a>
        </nav>
    </header>

    <main class="container">
        ${body}
    </main>

    <footer>
        FrameForecast | PC Gaming Performance Platform
    </footer>
</body>
</html>`;
}

module.exports = page;