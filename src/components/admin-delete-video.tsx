import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { VideoContract } from "../contracts/video-contract";
import axios from "axios";


export function AdminDeleteVideo()
{

    const [videos, setVideo] = useState<VideoContract>();

    let params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://video-server-1-xo7p.onrender.com/videos/${params.id}`)
        .then(response => {
            setVideo(response.data);
        })
    },[])

    function handleDeleteClick(){
        axios.delete(`https://video-server-1-xo7p.onrender.com/delete-video/${params.id}`)
        .then(() => {
            console.log('Video Deleted..')
        });
        navigate('/admin-dash');
    }

    return(
        <div>
            <h3>Delete Video</h3>
            <dl className="row">
                <dt className="col-3">Video Id</dt>
                <dd className="col-9"> {videos?.video_id} </dd>
                <dt className="col-3">Title</dt>
                <dd className="col-9"> {videos?.title} </dd>
                <dt className="col-3">Description</dt>
                <dd className="col-9"> {videos?.description} </dd>
                <dt className="col-3">Url</dt>
                <dd className="col-9"> {videos?.url} </dd>
                <dt className="col-3">Likes</dt>
                <dd className="col-9"> {videos?.likes} </dd>
                <dt className="col-3">Dislikes</dt>
                <dd className="col-9"> {videos?.dislikes} </dd>
                <dt className="col-3">Views</dt>
                <dd className="col-9"> {videos?.views} </dd>
                <dt className="col-3">Category</dt>
                <dd className="col-9"> {videos?.category_id} </dd>
            </dl>
            <div className="mt-3">
                <button className="btn btn-danger mx-2" onClick={handleDeleteClick}>Delete Video</button>
                <Link to="/admin-dash" className="btn btn-warning">Cancel</Link>
            </div>
        </div>
    )
}