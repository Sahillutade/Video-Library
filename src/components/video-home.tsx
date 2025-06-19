import { Link } from "react-router-dom";


export function VideoHome(){
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:'400px'}}>
            <Link className="btn btn-primary mx-2" to="/user-login"> User Login </Link>
            <Link className="btn btn-warning" to="/admin-login"> Admin Login </Link>
        </div>
    )
}