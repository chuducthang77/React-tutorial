import Hero from "./Hero";
import {Link} from 'react-router-dom'
//API: 0ff7dbc96c65ca2ec70347218a338eeb

// Movie search: https://api.themoviedb.org/3/search/movie?api_key=0ff7dbc96c65ca2ec70347218a338eeb&language=en-US&query=star%20wars&page=1&include_adult=false

const MovieCard = ({ movie }) => {
  const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const detailURL = `/movies/${movie.id}`
  return (
    <div className="col-lg-3 col-md-3 col-2 my-4">
      <div className="card" style={{ width: "18rem" }}>
        <img src={posterURL} class="card-img-top" alt={movie.original_title} />
        <div className="card-body">
          <h5 className="card-title">{movie.original_title}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link to={detailURL} class="btn btn-primary">
            Show details
          </Link>
        </div>
      </div>
    </div>
  );
};

const SearchView = ({ keyword, searchResults }) => {
  const title = `You are search for ${keyword}`;

  const resultsHTML = searchResults.map((obj, i) => {
    return <MovieCard movie={obj} key={i} />;
  });

  return (
    <>
      <Hero text={title} />
      {resultsHTML && (
        <div className="container">
          <div className="row">{resultsHTML}</div>
        </div>
      )}
    </>
  );
};

export default SearchView;
