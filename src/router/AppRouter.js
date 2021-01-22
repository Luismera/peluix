import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { MovieDetail } from '../components/MovieDetail';
import { MovieGrid } from '../components/MovieGrid';

export const AppRouter = () => {
    return (
        <Router>
            <header>
                
            </header>
            <main id="main">
                <Switch>
                    <Route exact path="/movies">
                        <MovieGrid />
                    </Route>
                    <Route exact path="/movies/:movieId">
                        <MovieDetail />
                    </Route>
                    <Redirect to="/movies" />   
                </Switch>
            </main>
        </Router>
    )
}
