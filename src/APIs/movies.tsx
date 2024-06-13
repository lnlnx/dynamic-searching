export async function getMovies() {
    const movies = await fetch("https://www.googleapis.com/books/v1/volumes?q=bookname&startIndex=0&maxResults=20");
    const data = await movies.json();
    return data;
}