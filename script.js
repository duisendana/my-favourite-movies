const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genreFilter");
const movieGrid = document.getElementById("movieGrid");
const noResults = document.getElementById("noResults");
const favoriteList = document.getElementById("favoriteList");

const movieCards = Array.from(movieGrid.querySelectorAll(".movie-card"));
const favorites = new Set();

function filterMovies() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;
    let visibleCount = 0;

    movieCards.forEach(function (card) {
        const name = card.dataset.name.toLowerCase();
        const genre = card.dataset.genre;
        const matchesSearch = name.includes(searchText);
        const matchesGenre = selectedGenre === "all" || genre === selectedGenre;
        const isVisible = matchesSearch && matchesGenre;

        card.style.display = isVisible ? "" : "none";

        if (isVisible) {
            visibleCount++;
        }
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
}

function updateFavorites() {
    favoriteList.innerHTML = "";

    favorites.forEach(function (card) {
        const copy = card.cloneNode(true);
        copy.querySelector(".favorite").textContent = "Таңдаулылардан алып тастау";
        copy.querySelector(".favorite").classList.add("active");
        favoriteList.appendChild(copy);
    });
}

movieGrid.addEventListener("click", function (event) {
    const button = event.target.closest(".favorite");

    if (!button) {
        return;
    }

    const card = button.closest(".movie-card");

    if (favorites.has(card)) {
        favorites.delete(card);
        button.textContent = "Таңдаулыларға қосу";
        button.classList.remove("active");
    } else {
        favorites.add(card);
        button.textContent = "Таңдаулылардан алып тастау";
        button.classList.add("active");
    }

    updateFavorites();
});

favoriteList.addEventListener("click", function (event) {
    const button = event.target.closest(".favorite");

    if (!button) {
        return;
    }

    const cardCopy = button.closest(".movie-card");
    const movieName = cardCopy.dataset.name;
    const originalCard = movieCards.find(function (card) {
        return card.dataset.name === movieName;
    });

    if (originalCard && favorites.has(originalCard)) {
        favorites.delete(originalCard);

        const originalButton = originalCard.querySelector(".favorite");
        originalButton.textContent = "Таңдаулыларға қосу";
        originalButton.classList.remove("active");

        updateFavorites();
    }
});

searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);

filterMovies();