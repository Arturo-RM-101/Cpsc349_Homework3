import { useState, useEffect, useCallback } from 'react';
import MovieDesign from './components/MovieDesign';
//import './App.css';

// This is a mapping of the sort options to the corresponding 
// API parameters which would give the respective value when
// Either of these 4 options are selected
const sortMap: Record<string, string> = {
  release_asc: 'release_date.asc',
  release_desc: 'release_date.desc',
  rating_asc: 'vote_average.asc',
  rating_desc: 'vote_average.desc'
};

// These are to remove the use of creating types
// At the start of each new file when passing the API's 
// data through the default function's parameter
export type Movie = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}


export default function App() {
  // We use useState <movie[]> to set the type of the data that will be stored in items
  // Which is an array of objects that will be used to store the API's data
  const [items, setItems] = useState<Movie[]>([]);

  // Since we only care about items total_ages and page we can set 
  // The type of pages to be an object with those two properties
  const [pages, setPages] = useState({total_pages: 1, page: 1});

  const [apiKey] = useState('581203ff744af30f98a807a3a1bf8037');
  //const [url] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Initial use of useEffect to fetch the API's data when the page is loaded
  // useEffect(() => {
  //   fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setItems(data.results);
  //     setPages({total_pages: data.total_pages, page: data.page});
  //     console.log(data.results);
  //   })
  //   .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  // MovieSet is the main function that fetches the API's data and is used 
  // Across the page to update the data based on the page number, search term, 
  // And sort option
  const moviesSet = useCallback((page = 1, term: string = '', sort: string = '') => {
    let url = '';

    // Rhe reason why we have a const here is to resolve the issue
    // Of the search leaving the results from deleting the last letter 
    // In the search
    const currentTerm = term.trim();
    
    if (currentTerm !== '') {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(currentTerm)}&page=${page}`;
    } else {
      // We create a const here to quickly grab the corresponding sorting
      // Option and if neither of the options are selected the "or" or "||" operator
      // Would set the sortParam to the default of "popularity.desc" which is the URL
      // For default popular movies
      const sortParam = sortMap[sort] || 'popularity.desc';
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sortParam}&page=${page}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.results);
        
        // Once we have the data, we don't just want to store the contents of the
        // Movies, but we also want to store the total pages and current page to be used for pagination
        setPages({total_pages: data.total_pages, page: data.page});
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [apiKey]);

  // Final way to initially display the page with the first 20 popular movies
  useEffect(() => {
    moviesSet(1);
  },[moviesSet]);

  // This was the initial approach to handle changes with pagnation but
  // Didn't handle sorting or searching properly so this had to be revamped
  // To use sorting and input data and change the list of movies from the API
  // const handleChangePage = (newPage: number) => {
  //   fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${newPage}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setItems(data.results);
  //       setPages({total_pages: data.total_pages, page: data.page});
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // };

  // Each functionality gets their own handling function to take care of their
  // Respective changes to the API data 
  const handleChangePage = (newPage: number) => {
    moviesSet(newPage, searchTerm, sortOption);
  }

  // These two functions in particular use 1 instead of newPage because when either 
  // Of these are used we want to reset the page back to 1 instead of keeping the same page number
  // Which could cause errors when the amount of pages from either a search or sort are less 
  // Than the current page number
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    moviesSet(1, value, sortOption);
  }

  const handleSort = (option: string) => {
    setSortOption(option);
    moviesSet(1, searchTerm, option);
  }

  // This is the inital approach to filtering and sorting the movies on the client side 
  // Which caused a lot of problems mainly having the sort and filter only filter the page of
  // The current movies shown instead of doing it for the entire API
  // const displayedMovies = [...items] .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
  //   .sort((a, b) => {
  //     switch (sortOption) {
  //       case 'release_asc':
  //         return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
  //       case 'release_desc':
  //         return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  //       case 'rating_asc':
  //         return a.vote_average - b.vote_average;
  //       case 'rating_desc':
  //         return b.vote_average - a.vote_average;
  //       default:
  //         return 0;
  //     }
  //   })

  // This is where all of the API data is passed to the MovieDesign component to be used across all components
  // With each passing either a useState or a function to function properly
  return (
    <div>
      <MovieDesign movies={items} pages={pages} changePage={handleChangePage} searchTerm={searchTerm} handleSearch={handleSearch} sortOption={sortOption} handleSort={handleSort}/>
    </div>
  );
}