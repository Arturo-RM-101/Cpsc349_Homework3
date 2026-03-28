import { Movie } from '../App';

// type Movie = {
//     id: number;
//     title: string;
//     release_date: string;
//     vote_average: number;
//     poster_path: string;
// }

type MovieCardProps = {
    movie: Movie;
}

// This is where the each mapped data (like using a for loop)
// Is sent to work with each individual movie to have it's own
// Design using styles.css for it
export default function MovieCard({movie}: MovieCardProps) {
    return(
        <div className='style'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
        </div>
    );

}