type SearchProps = {
    searchTerm: string;
    handleSearch: (value: string) => void;
}

export default function MovieSearch({searchTerm, handleSearch}: SearchProps) {
    return(
        <input 
            type="text" 
            className='right-shift' 
            placeholder="Search for a movie..." 
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
        />
    )
}