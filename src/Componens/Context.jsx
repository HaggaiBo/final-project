import { getDocs, collection } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import {db,auth} from '../Firebase';



const LeagueContext = createContext();
export function LeagueProvider({ children }) {
  
  const [playername, setPlayername] = useState("");
  const [user, setUser] = useState();
  const [dbUsers, setDbUsers] = useState();
  const userCollection = collection(db, "Users");

  const getUsers = async () => {
    const data = await getDocs(userCollection);
   const temp = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setDbUsers(temp);
  };


useEffect(()=>{
  getUsers();
},[])
  const value = {
   
    playername, setPlayername,
    user, setUser,
    dbUsers, setDbUsers
    
  };

  return <LeagueContext.Provider value={value}>{children}</LeagueContext.Provider>;
}

export function useLeague() {
  return useContext(LeagueContext);
}