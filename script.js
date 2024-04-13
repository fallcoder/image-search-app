// Unsplash API KEY
const ApiKey = "your-api-key";

// get references to HTML elements
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");

let inputData = "";
let page = 1;

// function to search for images based on user input
async function searchImage() {
  try {
    // get the user input from search input field and remove leading/trailing whitespace
    inputData = searchInputEl.value.trim();

    // check if the input has content after trimming whitespace
    if (inputData) {
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${ApiKey}`;

      // fetch data from the Unsplash API
      const response = await fetch(url);
      const data = await response.json();

      // clear existing search results if it's the first page
      if (page === 1) {
        searchResultsEl.innerHTML = "";
      }

      // extract the results from API response
      const results = data.results;

      // Iterate through each result and create HTML elements to display images
      results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        // create an image element and set its source and alt text
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        // create a link element to the Unsplash page of the image
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        // append the image and link elements to the search results container
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
      });

      // go to next page
      page++;
    }
  } 
  catch (error) {
    // handle the error
    console.error("An error has occurred", error.message);
    alert("An error occurred while searching for images. Please try again later.");
  }
}

// add an event listener to the form for handling forrm submission
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});

// function to detect when the user has reached the bottom of the page
function isBottomOfPage() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

// scroll event listener to load more images when user reaches the bottom of the page
window.addEventListener("scroll", () => {
  if (isBottomOfPage()) {
    searchImage();
  }
});

