import MovieCard from './MovieCard';
import MoviePage from './MoviePage';
import MovieSearch from './MovieSearch';
import MovieSort from './MovieSort';

// Import is used to reduce the redundancy of creating
// types from the App.tsx where all the API data resides
import { Movie } from '../App';

import './styles.css'

// In order to have the passing of API data we'd need to
// Give the types of the data that'll be needed to remove errors
// When passing through the default function's parameter

// Passed API's data with their corresponding types
// type Movie = {
//     id: number;
//     title: string;
//     release_date: string;
//     vote_average: number;
//     poster_path: string;
//     total_pages: number;
//     page: number;
// }

// An array of passed objects from the API
type MovieDesignProps = {
    movies: Movie[];
}

// All of these are passed pieces of data from the App.tsx to be used 
// In the MovieDesign component to be used across the rest of the files
type Pages = {
    total_pages: number;
    page: number;
}

type PagesProps = {
    pages: Pages;
}

type ChangePageProps = {
    changePage: (newPage: number) => void;
}

type SearchProps = {
    searchTerm: string;
    handleSearch: (value: string) => void;
}

type SortProps = {
    sortOption: string;
    handleSort: (option: string) => void;
}


export default function MovieDesign({movies, pages, changePage, searchTerm, handleSearch, sortOption, handleSort}: 
                                    MovieDesignProps & PagesProps & ChangePageProps & SearchProps & SortProps) {
    return (
        // Unlike a JavaScript file return is to be started using a
        // Div element to display content to the page

        // MovieSearch, MovieSort, MovieCard, and Moviepage
        // All are set with their own tag that would be replaced
        // By each file's own set of tags with their corresponding data
        // Along with passed pieces of data from App.tsx which have been
        // Set onto the parameters of MovieDesign
        <div>
            <div className='name'>
                <h1>Movie Design</h1>
            </div>
            <div className='input'>
                <MovieSearch searchTerm={searchTerm} handleSearch={handleSearch} />
                <MovieSort sortOption={sortOption} handleSort={handleSort} />
            </div>
            <div id='movies'>{movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))} 
            </div>
            <MoviePage page={pages.page} totalPages={pages.total_pages} changePage={changePage} />
        </div>
    );
}