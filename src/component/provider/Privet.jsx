import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "./AuthProvider";
const Private = ({children}) => {
    const { user} = useContext(AuthContext);
    const location=useLocation();
    const{loading}=useContext(AuthContext)

    if(loading){
        return <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
     }
        if(user){
            return children;
        }
        
        return <Navigate state={location.pathname} to="/signIn"></Navigate>
    };
Private.propTypes={
    children:PropTypes.node
}
export default Private;