

export async function getMovies(movieName: string) {
    const movies = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${movieName}&startIndex=0&maxResults=20`);
    const data = await movies.json();
    return data;
}