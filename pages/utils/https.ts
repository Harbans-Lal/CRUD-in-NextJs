import axios from 'axios';
 
export const http = axios.create({
    baseURL:`${process.env.BASE_URL}`,
    headers:{
        'Content-Type':'application/json',
    },
})