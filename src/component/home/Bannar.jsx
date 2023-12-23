
import { Link } from "react-router-dom";
import bannar from "../../assets/bannar image.png"
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
const Bannar = () => {
    const{user}=useContext(AuthContext);
    return (
        <div className=" max-w-[1900px] justify-center mx-auto">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <img src={bannar} className=" max-sm:w-[100%] max-sm:h-80 sm:w-[90%] sm:h-52 md:w-[60%] h-[28rem] md:h-[30rem] rounded-lg " />
                    <div>
                        <h1 className="text-5xl font-bold">FREE<br/>
                            ONLINE TASK<br/>
                            MANAGER</h1>
                        <p className="py-6">Organize and manage your team like a boss with tasks, a free task management tool packing more capabilities than you can imagine.</p>
                        {
                            user?<Link to="/dashboard">
                            <button className="btn btn-primary"> Go to Dashboard</button></Link>:<Link to="/signin">
                            <button className="btn btn-primary">Let’s Explore</button></Link>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bannar;