// SearchContext.tsx
import React, { createContext, ReactNode, useState } from "react";

interface taxonomy {
  taxonomyFilter: string;
  updatetaxonomyFilterQuery: (query: string) => void;
}

const SearchContext = createContext<taxonomy>({
  taxonomyFilter: "",
  updatetaxonomyFilterQuery: () => {},
});

interface SearchProviderProps {
  children: ReactNode;
}

const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [taxonomyFilter, setSearchQuery] = useState("");

  const updatetaxonomyFilterQuery = (query: string) => {
    setSearchQuery(query);
  };

  const contextValue: taxonomy = {
    taxonomyFilter,
    updatetaxonomyFilterQuery,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };
