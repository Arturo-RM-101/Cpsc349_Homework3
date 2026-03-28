import react from 'react';

type SortProps = {
    sortOption: string;
    handleSort: (value: string) => void;
}

export default function MovieSort({sortOption, handleSort}: SortProps) {
    return(
        // onChange works slightly differently here, it still allows changes
        // To be made when selecting any option but the differnece is that
        // A function from App.tsx is being called to handle the changes instead of just changing in here
        // Since App.tsx is where the API data is being stored we simply send the data
        // Of e.target.value onto one of App.tsx's handleSort function
        <select className='shift' value={sortOption} onChange={(e) => handleSort(e.target.value)}>
            <option value=''> Sort by </option>
            <option value='release_asc'> Release Date (Asc) </option>
            <option value='release_desc'> Release Date (Desc) </option>
            <option value='rating_asc'> Rating (Asc) </option>
            <option value='rating_desc'> Rating (Desc) </option>
        </select>
    )
}