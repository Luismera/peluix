import React, { useEffect, useRef, useState } from 'react'
import { MovieGridItem } from './MovieGridItem'
import { useMovies } from '../hooks/useMovies';


export const MovieGrid = () => {

    const [pageNumber, setPageNumber] = useState(1)
    const {
        movies,
        loading,
        error
    } = useMovies(pageNumber)

    const loader  = useRef()
    useEffect(() => {
        var options = {
           root: null,
           rootMargin: "20px",
           threshold: 1.0
        };
        // inicializar IntersectionObserver y lo enganchamos al div que contiene la referencia loader
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
           observer.observe(loader.current)
        }

    }, []);

    // aquí manejamos lo que sucede cuando el usuario se desplaza al div 
    // que contiene la referencia loader en este caso, 
    // solo actualizamos la variable de PageNumber
    const handleObserver = (entities) => {
        const target = entities[0];  
        if (target.isIntersecting) {   
            setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
    }

    // console.log(movies)

    return (
        <div className="content_wrapper">
            {/* <h2>Películas populares</h2> */}
            <div className="page_wrapper">
                {
                    movies.map( (movie, index) => {
                        return <MovieGridItem
                                    key={ index } 
                                    { ...movie }
                                />
                    })
                }
            </div>
            <div ref={loader}>{loading && 'Cargando...'}</div>
            <div>{error && 'Error'}</div>
        </div>
    )
}
