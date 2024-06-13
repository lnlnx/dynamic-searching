// import { useState } from 'react'
import { useEffect, useState } from "react"
import { getMovies } from "../APIs/movies";
import './field.css';
interface movie {
    id: string,
    volumeInfo: {
        title: string
    },
}
type movies =  movie[];


function InputField() {
  // const [count, setCount] = useState(0)
    const [movies, setMovies] = useState<movies>([]);
    const [newMovies, setNewMovies] = useState<movies>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedMovie, setSelectedMovie] = useState("");
    useEffect(()=>{
        getMovies().then((res) => {
            const {items} = res;
            setMovies(items);
        });
        
    }, [])
    function findMovies(text:string, movies: movies) {
        console.log('finding movie')
        return  movies.filter((item)=>{
             const {volumeInfo} = item;
             const {title} = volumeInfo;
             const tempAry = title.split(text);
             if(tempAry.length >=2) {
                 return item;
             }
         })
         
     }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMovie("");
        const text = e.target.value;
        setSearchText(text);
        const newMovies = findMovies(text, movies);
        setNewMovies(newMovies);
    }
    const handleOptionOnClick = (e:any) => {
        const text = e.target.innerText;
        setSelectedMovie(text);
        setNewMovies([]);
    }
    const handleClose = () => {
        setSearchText("");
        setSelectedMovie("");
        document.querySelector('input')?.focus();
    }
  return (
    <>
    <fieldset>
        <legend>Movies</legend>
        <div className="search">
            <input type='text' onChange={handleInputChange} value={selectedMovie? selectedMovie:searchText} placeholder="Movie"></input>
            {selectedMovie&&<p className="close button-group" onClick={handleClose}>X</p>}
            <p className="dropdown button-group">&#x25B2;</p>
        </div>
    </fieldset>
    <div className="movie-list">
        {newMovies.map((item: movie)=>{
            const {id, volumeInfo} = item;
            return <p key={id} onClick={handleOptionOnClick}>{volumeInfo.title}</p>
        })}
    </div>
    
   

    </>
  )
}

export default InputField
