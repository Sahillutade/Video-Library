import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";
import type { VideoContract } from "../contracts/video-contract";
import axios from "axios";

export function AdminDash(){

    const [cookies, , removeCookie] = useCookies(['admin_id']);
    const [videos, setVideos] = useState<VideoContract[]>();

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`https://video-server-1-xo7p.onrender.com/videos`)
        .then(response=>{
             setVideos(response.data);
        });
    },[])

    function SignoutClick(){
        removeCookie('admin_id');
        navigate('/');
    }

    return(
        <div>
            <h3 className="d-flex mt-4 justify-content-between"><span>Admin Dash</span>  <span>{cookies['admin_id']}</span> <button onClick={SignoutClick} className="btn btn-danger">Signout</button> </h3>
            <div className="mt-4">
                <Link to="/add-video" className="btn btn-primary bi bi-camera-video"> Add New Video</Link>
            </div>
            <table className="table table-hover caption-top">
                <caption>Uploaded Videos</caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos?.map(video => 
                            <tr key={video.video_id}>
                                <td>{video.title}</td>
                                <td>
                                    <iframe src={video.url} width="300" height="100"></iframe>
                                </td>
                                <td>
                                    <Link to={`/edit-video/${video.video_id}`} className="btn btn-warning bi bi-pen-fill mx-2"></Link>
                                    <Link to={`/delete-video/${video.video_id}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}