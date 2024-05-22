import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchDesk = () => {
  const router = useRouter();

  // State to manage the search query
  const [query, setQuery] = useState("");

  const handleSearch = (event: any) => {
    event.preventDefault();

    // Navigate to the search results page with the query parameter
    router.push(`/s?q=${query}`);
  };
  return (
    <form onSubmit={handleSearch}>
      <div className="navbar-center gap-2 hidden sm:flex md:flex lg:flex xl:flex">
        <div className="relative mt-4 md:mt-0">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="search"
            className="input input-bordered input-accent input-sm w-[500px] h-[41px] py-2 pl-5 text-black"
            placeholder="Search"
          />
        </div>
        <button
          type="submit"
          className="btn btn-xs btn-primary h-[41px] w-11"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchDesk;
