import SimpleLightbox from "simplelightbox";  
import "simplelightbox/dist/simple-lightbox.min.css";  

const gallery = document.querySelector(".gallery");  
const lightbox = new SimpleLightbox(".gallery a", {  
      
    captionDelay: 250,  
});  

export function renderImages(hits) {  
    const markup = hits  
        .map(hit => {  
            return `  
                <li class="gallery-item">  
                    <a class="gallery-link" href="${hit.largeImageURL}">  
                        <img class="gallery-image" src="${hit.webformatURL}" alt="${hit.tags}"/>  
                        <ul class="content-list">  
                            <li class="content-item"><p>Likes</p><p>${hit.likes}</p></li>  
                            <li class="content-item"><p>Views</p><p>${hit.views}</p></li>  
                            <li class="content-item"><p>Comments</p><p>${hit.comments}</p></li>  
                            <li class="content-item"><p>Downloads</p><p>${hit.downloads}</p></li>  
                        </ul>  
                    </a>  
                </li>  
            `;  
        })  
        .join("");  

    //gallery.innerHTML = "";  
    gallery.insertAdjacentHTML("beforeend", markup);  
    lightbox.refresh();   
}

export function clearGallery() {  
    gallery.innerHTML = "";  
}