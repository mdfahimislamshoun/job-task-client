import axios from "axios";

const axiosurl=axios.create({
  baseURL:"http://localhost:5000",
})



const UseAxios = () => {
return axiosurl;

}

export default UseAxios;