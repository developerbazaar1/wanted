// SearchContext.tsx
import React, { createContext, ReactNode, useState } from "react";

interface SearchContextProps {
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextProps>({
  searchQuery: "",
  updateSearchQuery: () => {},
});

interface SearchProviderProps {
  children: ReactNode;
}

const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const contextValue: SearchContextProps = {
    searchQuery,
    updateSearchQuery,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };
