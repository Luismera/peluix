import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getMovies = async ( page = 1) => {

    return await axios.get(`${ BASE_URL }/movie/popular`, { 
        params: { 
            page: page,
            limit: 20,
            api_key: process.env.REACT_APP_API_KEY,
            language: "es-ES"
        } 
    });

}


export const getMovie = async (id) => {

    return await axios.get(`${ BASE_URL }/movie/${ id }`, { 
        params: { 
            api_key: process.env.REACT_APP_API_KEY,
            language: "es-ES"
        } 
    });

}

export const getMovieCredits = async (id) => {

    return await axios.get(`${ BASE_URL }/movie/${ id }/credits`, { 
        params: { 
            api_key: process.env.REACT_APP_API_KEY,
            language: "es-ES"
        } 
    });

}