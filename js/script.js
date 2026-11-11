// Add your GIPHY API key between the quotation marks.
const API_KEY = "YOUR_GIPHY_API_KEY";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gifContainer = document.getElementById("gif-container");
const statusMessage = document.getElementById("status");

// This array stores the GIF image URLs returned by GIPHY.
let images = [];

async function fetchGifs(searchTerm) {
  if (API_KEY === "YOUR_GIPHY_API_KEY") {
    statusMessage.textContent = "Add your GIPHY API key in js/script.js before searching.";
    return;
  }

  statusMessage.textContent = "Loading GIFs...";
  gifContainer.innerHTML = "";
  images = [];

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=12&rating=g`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("GIPHY could not complete the search. Check your API key and try again.");
    }

    const result = await response.json();
    images = result.data.map((gif) => gif.images.fixed_width.url);

    console.log("GIPHY response:", result);
    console.log("GIF image URLs:", images);
    displayGifs();
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    statusMessage.textContent = error.message;
  }
}

function displayGifs() {
  gifContainer.innerHTML = "";

  if (images.length === 0) {
    statusMessage.textContent = "No GIFs found. Try another search.";
    return;
  }

  statusMessage.textContent = `Found ${images.length} GIFs.`;

  images.forEach((imageUrl) => {
    const column = document.createElement("div");
    column.className = "col-12 col-sm-6 col-lg-4";

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "GIF search result";
    image.className = "gif-image img-fluid";
    image.loading = "lazy";

    column.appendChild(image);
    gifContainer.appendChild(column);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    statusMessage.textContent = "Please enter something to search for.";
    searchInput.focus();
    return;
  }

  fetchGifs(searchTerm);
});

// Load the starter search when the page opens.
fetchGifs(searchInput.value);