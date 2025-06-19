import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";


export function RegisterUser()
{

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userid: '',
            username: '',
            password: '',
            email: ''
        },
        onSubmit: (user) => {
            axios.post(`https://video-server-1-xo7p.onrender.com/register-user`, user);
            alert('User Registered');
            navigate('/user-login');
        }
    })

    return(
        <div>
            <h3>Register User</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd> <input type="text" onChange={formik.handleChange} name="userid" /> </dd>
                    <dt>User Name</dt>
                    <dd> <input type="text" onChange={formik.handleChange} name="username" /> </dd>
                    <dt>Password</dt>
                    <dd> <input type="password" onChange={formik.handleChange} name="password" /> </dd>
                    <dt>Email</dt>
                    <dd> <input type="email" onChange={formik.handleChange} name="email" /> </dd>
                </dl>
                <button className="btn btn-warning" type="submit">Register</button>
                <div>
                    <Link to="/user-login">Existing User?</Link>
                </div>
            </form>
        </div>
    )
}