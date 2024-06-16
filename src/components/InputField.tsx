// import { useState } from 'react'
import { useEffect, useState, useRef } from "react"
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
    const [searchText, setSearchText] = useState<string>("");
    const [selected, setSelected] = useState(false);
    const timer = useRef(0);
    
    useEffect(()=> {
        //debounce
        let requestCancelled = false;
        if(searchText && !selected) {
            if(timer.current) {
                clearTimeout(timer.current);
                timer.current = setTimeout(()=>{
                    getMovies(searchText).then((res) => {
                    const {items} = res;
                    setMovies(items);
                });
            }, 500)
            } else {
                timer.current = setTimeout(()=>{
                    getMovies(searchText).then((res) => {
                    const {items} = res;
                    setMovies(items);
                });

            }, 500)
            }
        }
        if(requestCancelled) {
            clearTimeout(timer.current);
        }
        return ()=>{
            requestCancelled = true;
        }
        
    }, [searchText]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text= e.target.value;
        setSearchText(text);
        if(!text){
            setSelected(false);
            setMovies([]);
        }     
    }
    
    const handleOptionOnClick: React.MouseEventHandler<HTMLParagraphElement> = (e) => {
        const text = e.target as HTMLElement;
        console.log(text.innerText)
        setSearchText(text.innerText);
        setSelected(true);
    } 
    const handleClose = () => {
        setSearchText("");
        setMovies([]);
        setSelected(false);
        document.querySelector('input')?.focus();
    }
    const handleInputOnBlur = () => {
        setMovies([]);
    }
    const onEscapePressed:React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Escape') {
            setMovies([]);
        }
    }
  return (
    <>
    <fieldset>
        <legend>Movies</legend>
        <div className="search">
            <input type='text' onChange={handleInputChange} onBlur={handleInputOnBlur} onKeyDown={onEscapePressed} value={searchText} placeholder="Movie"></input>
            {searchText&&<p className="close button-group" onClick={handleClose}>&#x2715;</p>}
            {searchText? <p className="dropdown button-group">&#x25BC;</p> : <p className="dropdown button-group">&#x25B2;</p>}
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
