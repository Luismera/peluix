import { useEffect, useState } from 'react';
import axios from 'axios';
// import { getMovies } from '../helpers/fetchMovie';

const BASE_URL = process.env.REACT_APP_API_URL;

export const useMovies = (pageNumber) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
          method: 'GET',
          url: `${ BASE_URL }/movie/popular`,
          params: { 
            page: pageNumber,
            api_key: process.env.REACT_APP_API_KEY,
            language: "es-ES"
          },
          cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
          setMovies(prevMovies => {
            return [...new Set([...prevMovies, ...res.data.results.map(m => m )])]
          })
          setLoading(false)
        }).catch(e => {
          if (axios.isCancel(e)) return
          setError(true)
        })
        return () => cancel()
    }, [pageNumber])

    return { loading, error, movies }
    
}
