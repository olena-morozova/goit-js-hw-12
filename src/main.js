import { fetchImages } from "./js/pixabay-api.js";  
import { renderImages, clearGallery } from "./js/render-functions.js";  

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");  
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
const limit = 15;
let totalHits = 0;

form.addEventListener("submit", onSearchSubmit);
loadMoreBtn.addEventListener("click", onLoadMoreClick);

async function onSearchSubmit(event) {
    event.preventDefault();
    query = event.target.elements["search-text"].value.trim();
    
    if (query === "") return;
    
    page = 1;
    clearGallery();
         
    loader.classList.remove("hidden");
    loadMoreBtn.classList.add("hidden");

      try {
          const data = await fetchImages(query, page, limit);
          totalHits = data.totalHits;
        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            });
            return;
        }
        renderImages(data.hits);
         if (limit * page < totalHits) {
      loadMoreBtn.classList.remove("hidden");
    }
    } catch (error) {
        console.log("Помилка отримання даних:", error)
    } finally {
            
        loader.classList.add("hidden");
      form.reset();      
    }
}

async function onLoadMoreClick() {
    page += 1;
    loadMoreBtn.classList.add("hidden");
         
    loader.classList.remove("hidden");
    try {          
        const data = await fetchImages(query, page, limit);
        renderImages(data.hits);

        scrollPage();

        if (limit * page < totalHits) {
            loadMoreBtn.classList.remove("hidden");
        } else {
           
            iziToast.info({
      position: "topRight",
      message: "We're sorry, but you've reached the end of search results."
    });
  }        
    } catch (error) {
       console.log(error); 
    } finally {
       loader.classList.add("hidden"); 
    }

}

function scrollPage() {
  const card = document.querySelector(".gallery-item");
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth"
    });
  }
}
