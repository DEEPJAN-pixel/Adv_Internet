const featuredGames = [
    {
        id: "valorant",
        title: "VALORANT",
        genre: "COMPETITIVE SHOOTER",
        description: "Explore graphics settings for competitive gameplay."
    },
    {
        id: "cs2",
        title: "COUNTER-STRIKE 2",
        genre: "TACTICAL SHOOTER",
        description: "Explore performance settings for smoother competitive matches."
    },
    {
        id: "cyberpunk",
        title: "CYBERPUNK 2077",
        genre: "OPEN-WORLD RPG",
        description: "Discover how demanding graphics settings affect performance."
    }
];

let currentSlide = 0;

const gameSlide = document.getElementById("gameSlide");
const slideTitle = document.getElementById("slideTitle");
const slideGenre = document.getElementById("slideGenre");
const slideDescription = document.getElementById("slideDescription");
const slideLink = document.getElementById("slideLink");
const slideCounter = document.getElementById("slideCounter");
const slideDots = document.getElementById("slideDots");

function showSlide(index) {
    currentSlide = (index + featuredGames.length) % featuredGames.length;

    const game = featuredGames[currentSlide];

    slideTitle.textContent = game.title;
    slideGenre.textContent = game.genre;
    slideDescription.textContent = game.description;
    slideLink.href = "/games/" + game.id;

    gameSlide.className = "game-slide game-" + game.id;

    slideCounter.textContent =
        String(currentSlide + 1).padStart(2, "0") +
        " / " +
        String(featuredGames.length).padStart(2, "0");

    document.querySelectorAll(".slide-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });
}

featuredGames.forEach((game, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", "Show " + game.title);

    dot.addEventListener("click", () => {
        showSlide(index);
        restartSlideshow();
    });

    slideDots.appendChild(dot);
});

document.getElementById("prevSlide").addEventListener("click", () => {
    showSlide(currentSlide - 1);
    restartSlideshow();
});

document.getElementById("nextSlide").addEventListener("click", () => {
    showSlide(currentSlide + 1);
    restartSlideshow();
});

let slideshowTimer;

function restartSlideshow() {
    clearInterval(slideshowTimer);

    slideshowTimer = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

showSlide(0);
restartSlideshow();