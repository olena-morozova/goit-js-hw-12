import axios from "axios";  


const API_KEY = "49372428-d1d84138fa434fefe0cc10176";  
const BASE_URL = "https://pixabay.com/api/";  

export async function fetchImages(query, page = 1, limit = 15) {  
    const params = {  
        key: API_KEY,  
        q: query,  
        image_type: "photo",  
        orientation: "horizontal",  
        safesearch: true,  
        page: page,
        per_page: limit
    };  
    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
} catch(error) {  
            console.error("Помилка запиту:", error);  
            throw error; 
        };  
    
}