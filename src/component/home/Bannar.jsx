
import { Link } from "react-router-dom";
import bannar from "../../assets/bannar image.png"
const Bannar = () => {
    return (
        <div className=" max-w-[1900px] justify-center mx-auto">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <img src={bannar} className=" max-sm:w-[80%] sm:w-[80%] md:w-[60%] h-[28rem] md:h-[30rem] rounded-lg " />
                    <div>
                        <h1 className="text-5xl font-bold">FREE<br/>
                            ONLINE TASK<br/>
                            MANAGER</h1>
                        <p className="py-6">Organize and manage your team like a boss with tasks, a free task management tool packing more capabilities than you can imagine.</p>
                        <Link to="/signin">
                        <button className="btn btn-primary">Let’s Explore</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bannar;