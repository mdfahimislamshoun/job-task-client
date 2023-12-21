import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import{AuthContext} from"../provider/AuthProvider"
import Swal from "sweetalert2";


const SignIn = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const {userSignIn,signInWithGoogle}=useContext(AuthContext)

    const handleSignIn = (e) => {
        
        const email = e.email;
        const password = e.password;
        console.log(email, password);
        if (password.length < 6) {
            return toast.error(
                " password should have  6 character or longer",
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        } else if (!/[A-Z]/.test(password)) {
            return toast.error(
                " password should have an uppercase later",
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );

        } else if (!/[0-9]/.test(password)) {
            return toast.error(
                " password should have an  number like 123",
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        }
        else if (!/(?=[^!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~])/.test(password)) {
            return toast.error(
                " password should have an  special like *#%",
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        }
        userSignIn(email, password)
            .then((result) => {
                console.log(result.data)
                navigate(location?.state ? location.state : "/");

            })
            .catch((error) => {
                console.error(error);
                if (error) {
                    return Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'wrong email or password',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
    };
    const handelWithGoogle = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                navigate(location?.state ? location.state : "/");
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <div className="container  w-[95%] justify-center mx-auto">
            <Helmet>
                <title>SignIn</title>
            </Helmet>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col md:flex-row-reverse gap-20">
                    <div className="text-center lg:text-left">
                        <img className="w-full h-full" src="https://i.ibb.co/xmPNTVk/sign-in-2.png" alt="signUp image" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-red-50">
                        <div className="card-body">
                            <div className="text-center ">
                                <h1 className="text-5xl font-bold">SignIn Now!</h1>
                            </div>
                            <form onSubmit={handleSubmit(handleSignIn)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        placeholder="Email"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("password")}
                                        placeholder="Password"
                                        className="input input-bordered"
                                        required
                                    />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">
                                            Forgot password?
                                        </a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">
                                        Sign In
                                    </button>
                                </div>
                            </form>
                            <div className="divider text-black">OR</div>
                            <div className="flex gap-2 items-center justify-center">
                                <button onClick={handelWithGoogle}>
                                    {" "}
                                    <AiFillGoogleCircle className="text-3xl text-red-400">
                                        google
                                    </AiFillGoogleCircle>
                                </button>
                            </div>
                            <p className="text-center">
                                New here?please {""}
                                <Link to="/signUp" className=" text-rose-400 font-bold">
                                    SignUp
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default SignIn;