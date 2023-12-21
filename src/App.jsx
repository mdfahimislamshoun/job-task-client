import { Outlet } from "react-router-dom"
import NavBar from "./component/nav/NavBar"
import SignUp from "./component/login&out/SignUp"
import SignIn from "./component/login&out/SignIn"


function App() {


  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <SignUp></SignUp>
      <SignIn></SignIn>
    </>
  )
}

export default App
