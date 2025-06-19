import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { VideoContract } from "../contracts/video-contract";
import type { CategoriesContract } from "../contracts/categories-contract";
import axios from "axios";
import { useFormik } from "formik";


export function AdminEditVideo(){

    const [video, setVideo] = useState<VideoContract>();
     const [categories, setCategories] = useState<CategoriesContract[]>();

    let params = useParams();
    let navigate = useNavigate();

    function LoadCategories(){
        axios.get(`https://video-server-1-xo7p.onrender.com/categories`)
        .then(response=>{
             response.data.unshift({category_id:-1, category_name:'Select Category'});
             setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
        axios.get(`https://video-server-1-xo7p.onrender.com/videos/${params.id}`)
        .then(response=>{
             setVideo(response.data);
        })
    },[])

    const formik = useFormik({
        initialValues : {
            video_id : video?.video_id,
            title: video?.title, 
            description: video?.description, 
            url: video?.url, 
            likes: video?.likes, 
            dislikes: video?.dislikes, 
            views : video?.views,
            category_id: video?.category_id
        },
        onSubmit: (video)=>{
            axios.put(`https://video-server-1-xo7p.onrender.com/edit-video/${params.id}`, video);
            navigate('/admin-dash');
        },
        enableReinitialize: true
    })

    return(
        <div>
            <h3>Edit Video</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-3">Video Id</dt>
                    <dd className="col-9"><input value={formik.values.video_id} onChange={formik.handleChange} type="number" name="video_id"/></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input value={formik.values.title} onChange={formik.handleChange} type="text" name="title" /></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9"><input value={formik.values.description} onChange={formik.handleChange} type="text" name="description" /></dd>
                    <dt className="col-3">Url</dt>
                    <dd className="col-9"><input value={formik.values.url}  onChange={formik.handleChange} type="text" name="url" /></dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input value={formik.values.likes} onChange={formik.handleChange} type="number" name="likes" /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input value={formik.values.dislikes} onChange={formik.handleChange} type="number" name="dislikes" /></dd>
                    <dt className="col-3">Views</dt>
                    <dd className="col-9"><input value={formik.values.views} onChange={formik.handleChange} type="number" name="views" /></dd>
                    <dt className="col-3">Category</dt>
                    <dd className="col-9">
                        <select name="category_id" value={formik.values.category_id} onChange={formik.handleChange}>
                            {
                                categories?.map(category=><option key={category.category_id} value={category.category_id}> { category.category_name}</option>)
                            }
                        </select>
                    </dd>
                </dl>
                <button  type="submit" className="btn btn-success">Save Video</button>
                <Link to='/admin-dash' className="btn mx-2 btn-warning">Cancel</Link>
            </form>
           
        </div>
    )
}