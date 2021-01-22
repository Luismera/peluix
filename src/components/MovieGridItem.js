import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import * as moment from 'moment';
import 'moment/locale/es';
import imgDefault from '../assets/default.png';

export const MovieGridItem = ( { id, title, release_date, poster_path, backdrop_path } ) => {

    moment.locale('es');
    const { url } = useRouteMatch();

    return (
        <div className="card">
            <div className="image">
                <div className="wrapper">
                    <Link to={`${ url }/${ id }`} className="image" title={ title }>
                        <img src={ poster_path ? `https://image.tmdb.org/t/p/w300${ poster_path }` : imgDefault } className="poster" alt={ title } />
                    </Link>
                </div>
            </div>
            <div className="content">
                <h2>
                    <Link to={`${ url }/${ id }`} title={ title }>{ title }</Link>
                </h2>
                <p className="card-text">{ moment(release_date).format("DD MMM YYYY") }</p>
            </div>
        </div>
    )
}
