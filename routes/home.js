const express = require("express");
const router = express.Router();
const page = require("../utils/page");

// Home page
router.get("/", (req, res) => {
    res.send(page("FrameForecast", `
        <section class="hero">
            <p class="eyebrow">PC GAMING PERFORMANCE PLATFORM</p>

            <h1>UNLOCK YOUR PC'S <span>POTENTIAL.</span></h1>

            <p class="hero-description">
                Explore gaming performance, discover optimization
                tips, and analyze your PC hardware.
            </p>

            <div class="hero-buttons">
                <a href="/analyze" class="btn">ANALYZE MY PC →</a>
                <a href="/games" class="btn btn-outline">BROWSE GAMES</a>
            </div>
        </section>

        <section class="featured">
            <div class="section-heading">
                <h2>FEATURED GAMES</h2>
                <span id="slideCounter">01 / 03</span>
            </div>

            <div class="slider">
                <button id="prevSlide" class="slide-arrow" type="button"
                    aria-label="Previous game">❮</button>

                <div id="gameSlide" class="game-slide game-valorant">
                    <div class="slide-content">
                        <p id="slideGenre" class="eyebrow">
                            COMPETITIVE SHOOTER
                        </p>

                        <h3 id="slideTitle">VALORANT</h3>

                        <p id="slideDescription">
                            Explore graphics settings for competitive gameplay.
                        </p>

                        <a id="slideLink" href="/games/valorant">
                            EXPLORE GAME →
                        </a>
                    </div>
                </div>

                <button id="nextSlide" class="slide-arrow" type="button"
                    aria-label="Next game">❯</button>
            </div>

            <div id="slideDots" class="slide-dots"></div>
        </section>

        <section class="optimization">
            <div class="section-heading">
                <h2>PC OPTIMIZATION BASICS</h2>
            </div>

            <div class="tips-grid">
                <article class="tip-card">
                    <div class="tip-icon">⚡</div>
                    <h3>Graphics Settings</h3>
                    <p>
                        Lowering demanding graphics settings can
                        improve frame rates in many games.
                    </p>
                </article>

                <article class="tip-card">
                    <div class="tip-icon">▣</div>
                    <h3>CPU & GPU</h3>
                    <p>
                        Understand how your processor and graphics
                        card affect gaming performance.
                    </p>
                </article>

                <article class="tip-card">
                    <div class="tip-icon">▤</div>
                    <h3>Resolution</h3>
                    <p>
                        Higher resolutions generally require more
                        graphics processing power.
                    </p>
                </article>

                <article class="tip-card">
                    <div class="tip-icon">⚙</div>
                    <h3>System Optimization</h3>
                    <p>
                        Keep graphics drivers updated and reduce
                        unnecessary background applications.
                    </p>
                </article>
            </div>
        </section>

        <script src="/public/home.js"></script>
    `));
});

module.exports = router;