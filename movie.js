export const movieList = async () => {
    const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=544ab12ee521cc3d6b5a2b54926cb569&language=en-US&page=1");
    const data = await response.json();
    return data;
}