import { fetchImages } from "./js/pixabay-api.js";  
import { renderImages, clearGallery } from "./js/render-functions.js";  

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");  
const loader = document.querySelector(".loader");

form.addEventListener("submit", (event) => {  
    event.preventDefault();  

    const query = event.target.elements["search-text"].value.trim(); 

    if (query === "") {  
        console.log("Поле пошуку порожнє");  
        return;  
    }  

    clearGallery();
loader.classList.remove("hidden");

    fetchImages(query)  
        .then(data => {  
            if (data.hits.length === 0) {  
                iziToast.error({
    message: 'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight'
});
                return;  
            }  
            renderImages(data.hits);  
        })  
        .catch(error => console.log("Помилка отримання даних:", error))
        .finally(() => {
            
        loader.classList.add("hidden");
      form.reset();
      
    });
});