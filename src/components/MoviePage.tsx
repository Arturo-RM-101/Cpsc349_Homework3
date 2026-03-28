import react from 'react';

type PagesProps = {
    page: number;
    totalPages: number;
    changePage: (newPage: number) => void;
}

export default function MoviePage({page, totalPages, changePage}: PagesProps) {
    return (
        // Just like onChange, onClick also uses one of App.tsx changePage function
        // By providing the page number and either incrementing or decrementing
        // In addition, we're using disabled, which is a built in HTML attribute that 
        // Disables the button when the condition is met and doesn't work when button is not clicked
        <div className='change'>
            <button onClick={() => changePage(page - 1)} className='previous' disabled={page === 1}> Previous </button>
            <p className='text'> Page {page} of {totalPages} </p>
            <button onClick={() => changePage(page + 1)} className='next' disabled={page === totalPages}> Next </button>
        </div>
    );
}