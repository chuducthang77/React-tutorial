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
            const posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
            const backdropURL = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
            return (
                <>
                    <Hero text={movieDetails.original_title} backdrop={backdropURL}/>
                    <div className ="container my-5"> 
                        <div className ="row">
                            <div className ="col-md-3">
                                <img src={posterPath} alt='...' className='img0fluid shadow rounded'/>
                            </div>
                            <div className ="col-md-9">
                                <h2>{movieDetails.original_title}</h2>
                                <p className='lead'>{movieDetails.overview}</p>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

  return renderMovieDetails()
};

export default MovieView;