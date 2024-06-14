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
    const [movies, setMovies] = useState<movies>([]);
    // const [newMovies, setNewMovies] = useState<movies>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedMovie, setSelectedMovie] = useState("");
    // useEffect(()=>{
    //     getMovies().then((res) => {
    //         const {items} = res;
    //         setMovies(items);
    //     });
        
    // }, [])
    useEffect(()=>{
        if(!searchText || selectedMovie) {
            setMovies([]);
            return
        }
        document.addEventListener('keydown', onEscapePressed);
        getMovies(searchText).then((res) => {
            const {items} = res;
            setMovies(items);
        });
        return ()=> document.removeEventListener('keydown', onEscapePressed);
    }, [searchText])
    // function findMovies(text:string, movies: movies) {
    //     return  movies.filter((item)=>{
    //          const {volumeInfo} = item;
    //          const {title} = volumeInfo;
    //          const tempAry = title.split(text);
    //          if(tempAry.length >=2) {
    //              return item;
    //          }
    //      })
         
    //  }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMovie("");
        // setTimeout(()=>{
        setSearchText(e.target.value);
        // }, 1000)
        // const newMovies = text ? findMovies(text, movies): [];
        // setNewMovies(newMovies);
    }
    const handleOptionOnClick = (e:any) => {
        const text = e.target.innerText;
        setSelectedMovie(text);
        setMovies([]);
        // setNewMovies([]);
    }
    const handleClose = () => {
        setSearchText("");
        setSelectedMovie("");
        document.querySelector('input')?.focus();
    }
    const handleInputOnBlur = () => {
        setSelectedMovie("");
    }
    const onEscapePressed = (e:KeyboardEvent) => {
        if(e.key === 'Escape') {
            setMovies([]);
        }
    }
  return (
    <>
    <fieldset>
        <legend>Movies</legend>
        <div className="search">
            <input type='text' onChange={handleInputChange} onBlur={handleInputOnBlur} value={selectedMovie? selectedMovie:searchText} placeholder="Movie"></input>
            {selectedMovie&&<p className="close button-group" onClick={handleClose}>&#x2715;</p>}
            {selectedMovie? <p className="dropdown button-group">&#x25BC;</p> : <p className="dropdown button-group">&#x25B2;</p>}
        </div>
    </fieldset>
    <div className="movie-list">
        {movies.map((item: movie)=>{
            const {id, volumeInfo} = item;
            return <p key={id} onClick={handleOptionOnClick}>{volumeInfo.title}</p>
        })}
    </div>
    
   

    </>
  )
}

export default InputField
