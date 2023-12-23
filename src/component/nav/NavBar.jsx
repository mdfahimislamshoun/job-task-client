import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const NavBar = () => {
  const{user,logOut}=useContext(AuthContext);
  console.log(user);

  const handelLogOut=()=>{
    logOut()
  }
  return (
    <div className=" max-w-[1900px] justify-center mx-auto">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
            
            <div className="flex-1 px-2 mx-2">Navbar Title</div>
            <div className="flex dropdown-end md:hidden">
            <div className="flex-none md:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </div>
            <div className="flex-none hidden md:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About us</NavLink></li>
                {user?<li><NavLink to="/dashboard">Dashbord</NavLink></li>:""}
                {user?<li><NavLink to="/addTask">Add task</NavLink></li>:""}
                {user?<li><button onClick={handelLogOut}>Log Out</button></li>:""}
                <li>
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />

                    </div>

                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side z-10">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay "></label>
          <ul className="menu p-4 w-48 min-h-full  bg-base-200">
            {/* Sidebar content here */}
            <li><NavLink to="/">Home</NavLink></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;