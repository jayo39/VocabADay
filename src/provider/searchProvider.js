import { createContext, useState } from "react";

export const SearchContext = createContext(null);

const SearchProvider = (props) => {

    const [keyword, setKeyword] = useState('');
    const [bookList, setBookList] = useState([]);
    const [genre, setGenre] = useState('')

    return (
        <SearchContext.Provider value={{keyword, setKeyword, bookList, setBookList, genre, setGenre}}>
            {props.children}
        </SearchContext.Provider>
    );
}

export default SearchProvider;