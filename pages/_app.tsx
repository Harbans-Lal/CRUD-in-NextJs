import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";

const myContext = React.createContext();
export default function App({ Component, pageProps }: AppProps) {
const [editData, setEditData] = useState([]);
const [deleteid, setDeleteId] = useState("");
const [allProduct, setAllProduct] = React.useState<any[]>([]);
const [updateId, setUpdateId] = useState("")
  return (
    <>
    <myContext.Provider value={{editData, setEditData, deleteid, setDeleteId, allProduct, setAllProduct, updateId, setUpdateId}}>
      <Component {...pageProps} />
    </myContext.Provider>
       
    </>
  
);
}

export {myContext};