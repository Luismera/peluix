import React, { useEffect, useState } from 'react';
import { getMovieCredits } from '../helpers/fetchMovie';
import imgDefault from '../assets/default.png';

export const MovieCredits = ( { id, title } ) => {

    const [credits, setCredits] = useState([])

    useEffect(() => {
        if(id){
            getMovieCredits(id).then((resp) => {
                setCredits( resp.data.cast );
            })
        }
    }, [id])

    return (
        <div className="footer">
            <div className="single_column">
                <section className="panel top_billed scroller">
                    <h3>Reparto principal</h3>
                    <div id="cast_scroller" className="scroller_wrap should_fade is_fading">
                    <ol className="people scroller">
                        {
                            credits.slice(0, 9).map( credit => {
                                return <li key={ credit.id } className="card">
                                            <a href={ `https://www.themoviedb.org/person/${credit.id}-${credit.name}` } rel="noreferrer" target="_blank">
                                                <img className="profile" alt={ credit.name } src={ credit.profile_path ? `https://image.tmdb.org/t/p/w185${ credit.profile_path }` : imgDefault } />
                                            </a>
                                            <p><a href={ `https://www.themoviedb.org/person/${credit.id}-${credit.name}` } rel="noreferrer" target="_blank">{ credit.name }</a></p>
                                            <p className="character">{ credit.character }</p>
                                        </li>
                            })
                        }                        
                        <li className="filler view_more">
                            <p><a href={ `https://www.themoviedb.org/movie/${id}-${title}/cast` } rel="noreferrer" target="_blank">Ver más <span className="mdi mdi-arrow-right"></span></a></p>
                        </li>
                    </ol>
                    <div className="style_wrapper"></div>
                    </div>
                    <p className="new_button"><a className="" href={ `https://www.themoviedb.org/movie/${id}-${title}/cast` } rel="noreferrer" target="_blank">Reparto y equipo completo</a></p>
                </section>
            </div>
        </div>
    )
}
