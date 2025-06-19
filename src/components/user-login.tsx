import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";

export function UserLogin(){


    let navigate = useNavigate();
    const [, setCookie] = useCookies(['user_id']);

    const formik = useFormik({
        initialValues: {
            userid: '',
            password: ''
        },
        onSubmit: (admin) => {
             axios.get(`https://video-server-1-xo7p.onrender.com/users`)
             .then(response=>{
                  var record = response.data.find((item:any) => item.userid===admin.userid);
                  if(record) {
                      if(record.password===admin.password) {
                          setCookie('user_id', admin.userid);
                          navigate('/user-dash');
                      } else {
                          alert('Invalid Password');
                      }
                  } else {
                      alert('Invalid User Id');
                  }
             })
        }
    })

    return(
        <div>
            <h3>User Login</h3>
            <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" onChange={formik.handleChange} name="userid" /></dd>
                <dt>Password</dt>
                <dd><input type="password" onChange={formik.handleChange} name="password" /></dd>
            </dl>
            <button className="btn btn-warning" type="submit">Login</button>
            <div className="my-2">
                <Link to="/register-user">New user Register</Link>
            </div>
            </form>
        </div>
    )
}