const movieBox = document.querySelector("#movie-box");
const searchBox = document.querySelector("#search-box");

searchBox.addEventListener(
    "keyup",
    function (e) {
        getMovies(e.target.value);
    }
)


async function getMovies(movie_name = "") {
    movieBox.innerHTML = "";
    let API = "";
    if (movie_name != "") {
        API = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${movie_name}`;
    } else {
        API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
    }
    const response = await fetch(API);
    if (response.status == 200) {
        const data = await response.json();
        for (d of data.results) {
            const item = document.createElement("div");
            item.classList.add("mt-2", "col-3", "item");
            item.innerHTML = `
                <img width="100%" 
                src="https://image.tmdb.org/t/p/w1280${d.poster_path == null ? d.backdrop_path : d.poster_path}"/>
                <div class="movie-card">${d.title}</div>
            `;
            movieBox.append(item);
        }
    }
}