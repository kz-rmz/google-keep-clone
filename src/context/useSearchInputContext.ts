import * as React from 'react';

type SearchInputContextType = {
    searchInput: string | null,
    setSearchInput: React.Dispatch<React.SetStateAction<string | null>>
}

const ISearchInputContext = {
    searchInput: null,
    setSearchInput: () => {}
}
const SearchInputContext = React.createContext<SearchInputContextType>(ISearchInputContext);

export default SearchInputContext;