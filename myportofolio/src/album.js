import { Button } from '@mui/material';
import './App.css';
import './album.css';
import { useState,useEffect } from "react";
import Gallery from './gallery';
import appUser from './appUser';

function Album(props) {
    const [expanded, setExpanded] = useState(props.expanded);
    const [pinned, setPinned] = useState(props.album.pinned ?? false);
    const [publicView, setPublicView] = useState(props.album.publicView);
    const [userName, setUserName] = useState(null);

   
    
    useEffect(() => {
        const getUserName = async () => {
            appUser.getUser(props.album.user, (uname) => {
                if (uname) {
                    setUserName(uname.name);
                }
            });
            
        };

        getUserName();
    }, [props.album.user]); // Empty dependency array means this effect runs once on mount


    return (
        <div id={'DivAlbum' + props.album.id} className={expanded ? 'Div-Border' : ''}>
            {(!expanded) &&
                <div>
                    <Button id={"Pin" + props.album.id} onClick={() => {
                        setExpanded(true);
                    }}>  {props.album.name} {pinned ? "- Pinned" : ""}</Button>
                </div>
            }
            {
                expanded && 

                <h1> {props.album.name}  by { userName }    </h1>

            }

            {
                expanded && 
                <div>
                    <p>
                        {props.album.desc}
                    </p>

                    <Button onClick={() => {
                        props.pinFn(props.album.id, !pinned);
                        setPinned(!pinned);
                    }}> {pinned ? "Unpin" : "Pin"} </Button>

                    <Button onClick={() => {
                        setPublicView(!publicView);
                    }}> {publicView ? "Make private" : "Make public"} </Button>
                    <Button onClick={() => {
                        
                    }}> Rename</Button>
                    <Button onClick={() => props.deleteFn(props.album.id)}> Delete</Button>
                </div>
            }
            {expanded &&
                <div>
                    <Gallery name={props.album.name} albumId={props.album.id}/>
                    <Button onClick={() => {
                        setExpanded(false);
                    }}> Close </Button>
                </div>
            }
        </div>
    );
}

export default Album;
