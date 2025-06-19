import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminLogin(){


    const [, setCookie] = useCookies(['admin_id']);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            admin_id: '',
            password: ''
        },
        onSubmit: (admin) => {
             axios.get(`https://video-server-1-xo7p.onrender.com/admin`)
             .then(response=>{
                  var record = response.data.find((item:any) => item.admin_id===admin.admin_id);
                  if(record) {
                      if(record.password===admin.password) {
                          setCookie('admin_id', admin.admin_id);
                          navigate('/admin-dash');
                      } else {
                          alert('Invalid Password');
                      }
                  } else {
                      alert('Invalid Admin Id');
                  }
             })
        }
    })

    return(
        <div>
            <h5>Admin Login</h5>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="admin_id" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="password" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
            </form>
        </div>
    )
}