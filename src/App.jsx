import { Outlet } from "react-router-dom"
import NavBar from "./component/nav/NavBar"


function App() {


  return (
    <div className=" max-w-[1900px] justify-center mx-auto bg-base-200">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
