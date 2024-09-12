import { defaults } from "autoprefixer"
import axios from "axios"

export const checkAuth = async ()=>{
    axios.defaults.withCredentials = true;
    const res = await axios.get("http://localhost:3100/api/checkAuth",{
        withCredentials:true,
    });
    const data = await res.data;
    // console.log(data);
    return data;
}