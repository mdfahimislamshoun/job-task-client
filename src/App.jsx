import { Outlet } from "react-router-dom"
import NavBar from "./component/nav/NavBar"


function App() {


  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  )
}

export default App
