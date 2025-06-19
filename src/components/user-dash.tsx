import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import type { VideoContract } from "../contracts/video-contract";
import axios from "axios";

export function UserDash(){

    const [cookies, , removeCookie] = useCookies(['user_id']);
    const [videos, setVideos] = useState<VideoContract[]>();

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4040/videos`)
        .then(response=>{
             setVideos(response.data);
        });
    },[])

    function SignoutClick(){
        removeCookie('user_id');
        navigate('/');
    }


    return(
        <div>
            <h3 className="d-flex mt-4 justify-content-between"><span>{cookies['user_id']}  <button className="bi bi-plus btn">My List</button> </span> <span>User Dash</span> <button onClick={SignoutClick} className="btn btn-link">  Signout</button> </h3>
            <div className="my-3 w-50">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search videos: Java, Aws, React" /> <button className="bi bi-search btn btn-warning"></button>
                 </div>
                
            </div>
            <section className="d-flex flex-wrap">
                {
                    videos?.map(video=>
                        <div className="card m-2 p-2" style={{width:'300px'}} key={video.video_id}>
                            <div className="card-header">
                                <iframe width="100%" height="200" src={video.url}></iframe>
                            </div>
                            <div className="card-body">
                                <div className="fw-bold">{video.title}</div>
                                <p>{video.description}</p>
                            </div>
                            <div className="card-footer">
                                <button className="btn bi bi-hand-thumbs-up"> {video.likes} </button>
                                <button className="btn bi bi-hand-thumbs-down"> {video.dislikes} </button>
                                <button className="btn bi bi-eye-fill"> {video.views} </button>
                                <button className="btn bi bi-plus "> Watch Later</button>
                            </div>
                        </div>
                    )
                }
            </section>
        </div>
    )
}