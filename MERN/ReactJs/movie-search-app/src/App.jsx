import { useEffect, useState } from "react"
import DisplayBox from "./DisplayBox"
import SearchBox from "./SearchBox"

function App() {
  const [movies, setMovie] = useState([]);
  const [search, setSearch] = useState("");

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const getMovies = async () => {
    let API = "";
    if (search != "") {
      API = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${search}`
    } else {
      API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
    }
    const response = await fetch(API);
    const data = await response.json();
    setMovie(data.results);
  }

  useEffect(
    () => {
      // Debounced API call
      const fetchData = debounce(getMovies, 1000);

      fetchData();
    }, [search] // first render and on change of search
  )

  const movieSearchNameHandler = (value) => {
    setSearch(value);
  }

  return (
    <div className="container">
      <SearchBox serachHandler={movieSearchNameHandler} />
      <DisplayBox movies={movies} />
    </div>
  )
}

export default App
