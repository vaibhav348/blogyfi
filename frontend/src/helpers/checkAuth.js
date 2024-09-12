import { defaults } from "autoprefixer"
import axios from "axios"

export const checkAuth = async ()=>{
    axios.defaults.withCredentials = true;
    const res = await axios.get("https://blogyfi.onrender.com/api/checkAuth",{
        withCredentials:true,
    });
    const data = await res.data;
    // console.log(data);
    return data;
}