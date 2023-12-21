import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import UseAxios from "../hooks/UseAxios";

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const { createUser,logOut } = useContext(AuthContext);
    const axiosUrl=UseAxios();
    
      const handleSignUp = (e) => {
        e.preventDefault();
        const name = e.name;
        const email = e.email;
        const password = e.password;
        console.log(name, email, password);
        const userData={name, email, password}
    
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
        }
        else if (!/[0-9]/.test(password)) {
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
    
    
        createUser(email, password)
          .then((result) => {
            axiosUrl.post("/user", userData)
            logOut(result)
            if (result) {
              return Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'you SignUp successfully',
                showConfirmButton: false,
                timer: 1500,
                
              })
              
            }
            
            console.log(result.user);
            
          })
          .catch((error) => {
            console.error(error);
          });
      };
    return (
        <div className="container  w-[95%] justify-center mx-auto">
        <div className="hero min-h-screen ">
          <div className="hero-content flex-col md:flex-row-reverse gap-20">
            <div className="text-center lg:text-left">
              <img className="w-full h-full" src="https://i.ibb.co/0VfWctC/signup-2.png" alt="signUp image" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-red-50">
                <div className="card-body">
                  <div className="text-center ">
                    <h1 className="text-5xl font-bold">SignUp now!</h1>
                  </div>
                  <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        placeholder="name"
                        className="input input-bordered"
                        required
                      />
                    </div>
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
                    </div>
                    <div className="form-control mt-6">
                      <button type="submit" className="btn btn-primary">
                        sign Up
                      </button>
                    </div>
                  </form>
                  <p className="text-center">
                    Already have account?please {""}
                    <Link to="/signIn" className=" text-rose-400 font-bold">
                      SignIn
                    </Link>
                  </p>
                </div>
              </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
};

export default SignUp;