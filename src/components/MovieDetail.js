import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { getMovie } from '../helpers/fetchMovie';
import * as moment from 'moment';
import 'moment/locale/es';
import { MovieCredits } from './MovieCredits';
import imgDefault from '../assets/default.png';

export const MovieDetail = () => {

    moment.locale('es');

    const { movieId } = useParams();
    const history = useHistory();
    const [movie, setMovie] = useState({})

    useEffect(() => {
        getMovie(movieId).then( (resp) => {
            setMovie(resp.data);
        })
    }, [movieId])

    const secondsToString = (seconds) => {
        seconds = seconds * 60
        var hour = Math.floor(seconds / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        // var second = seconds % 60;
        // second = (second < 10)? '0' + second : second;
        return `${hour}h ${minute}m`;// hour + ':' + minute + ':' + second;
    }

    return (

        <section className="inner_content movie_content backdrop poster">
            <div className="header large border first" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${ movie.backdrop_path})` }}>
                <div className="keyboard_s custom_bg">
                    <div className="single_column">
                        <section id="original_header" className="images inner">
                            <div className="poster_wrapper">
                                <div className="poster">
                                <div className="image_content backdrop">
                                    <img className="poster lazyload lazyloaded" src={ movie.poster_path ? `https://image.tmdb.org/t/p/w400${ movie.poster_path }` : imgDefault } alt={movie.title} />
                                </div>
                                </div>
                            </div>
                            <div className="header_poster_wrapper">
                                <section className="header poster">
                                    <div className="title ott_true" dir="auto">
                                        <h2 className="24">
                                            <div onClick={() => history.goBack()}><i className="mdi mdi-arrow-left"></i></div>
                                            <a href="/">{ movie.original_title }</a> 
                                            <span className="tag release_date">({moment(movie.release_date).format('YYYY')})</span>
                                        </h2>
                                        <div className="facts">
                                            <span className="release">
                                            { moment(movie.release_date).format("LL") }
                                            </span>
                                            <span className="genres">
                                            {
                                                movie.genres?.map( (genre, i) => {
                                                    if (movie.genres.length === i + 1) {
                                                        return <a href={`https://www.themoviedb.org/genre/${ genre.id}-${ encodeURI(genre.name) }/movie`} rel="noreferrer" target="_blank" key={genre.id}>{genre.name}</a>
                                                    } else {
                                                        return <a href={`https://www.themoviedb.org/genre/${ genre.id}-${ encodeURI(genre.name) }/movie`} rel="noreferrer" target="_blank" key={genre.id}>{genre.name}, </a>
                                                    }
                                                })
                                            }
                                            </span>
                                            <span className="runtime">
                                            { secondsToString(movie.runtime) }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="header_info">
                                    <h3 className="tagline" dir="auto">{ movie.tagline }</h3>
                                    <h3 dir="auto">Vista general</h3>
                                    <div className="overview" dir="auto">
                                        <p>{ movie.overview }</p>
                                    </div>
                                </div>
                                </section>
                            </div>
                        </section>
                        <div id="ott_offers_window" className="hidden">
                        </div>
                    </div>
                </div>
            </div>
            <MovieCredits { ...movie } />
        </section>
    )
}
