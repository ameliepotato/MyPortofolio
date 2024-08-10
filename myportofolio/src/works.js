import './App.css';
import { Button } from '@mui/material';
import { useState } from "react";
import Album from './album';

function Works() {
    const [albums, setAlbums] = useState([{ id: "1", name: "one"},{ id: "2", name: "two"},{ id:"3", name:"three"}]);
    return (
        <div id="albums">
           {albums.map((album) => {
            return( 
                <Album name={ album.name } key={album.id} id={album.id} expanded={false}></Album>
           );
        })} 
                   <Button onClick={() => {
                    let copy = [...albums];
                    copy.push( { id: (albums.length+1).toString(), name: "NewAlbum" + (albums.length-2).toString() } );
                    setAlbums(copy);
                }}>Add new album</Button>
            
        </div>
    );
}

export default Works;
