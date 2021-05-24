import Hero from "./Hero";
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

const MovieView = () => {

    const {id} = useParams()
    const [movieDetails, setMovieDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0ff7dbc96c65ca2ec70347218a338eeb&language=en-US`)
        .then(response => response.json())
        .then(data => setMovieDetails(data),
                setIsLoading(false))
    }, [id])

    function renderMovieDetails() {
        if (isLoading) {
            return <Hero text="..."/>
        }

        if (movieDetails) {
            return <Hero text={movieDetails.original_title} />
        }
    }

  return renderMovieDetails()
};

export default MovieView;