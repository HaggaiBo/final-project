import React from 'react'
import { useEffect,useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from "../Firebase"
import { doc, getDoc } from "firebase/firestore";
import { useLeague } from './Context';

export default function SortTheBets() {

  
  const {user} =useLeague()

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       console.log(currentUser);
  //       console.log(user);
  //       getData();
  //     }
  //   });
  
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // const getData = async () => {
  //   const docRef = await doc(db, "Users", user.email);
  //   const docSnap = await getDoc(docRef);
  //   const data =await docSnap.data();
  //   console.log(data);
  // }
  
  
 console.log("sort the bets");
}
