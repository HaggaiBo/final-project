import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { DataContext } from '../App';
import { useLeague } from './Context'

import { auth,db } from "../Firebase"
import {arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

import { onAuthStateChanged, getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence  } from 'firebase/auth';
import { collection } from 'firebase/firestore';

export default function LogInD() {

    const [loginEmail, setLoginEmail] = useState("a@gmail.com");
    const [loginPassword, setLoginPassword] = useState("123456");
    const navigate = useNavigate();
    const { user ,setUser } = useLeague();
    const usersCollectionRef = collection(db, "users");
    const currentDate = new Date();
    const [isInside,setIsInside]= useState(false);
    const [preGames,setPreGammes]=useState([]);
    const [nextGames,setNextGammes]=useState([]);
const SortOldBets= async()=>{

    const docRef = await doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);
    const data =await docSnap.data();
    setNextGammes(data.BetsArray.filter((item) => item.date.toDate().getTime() > currentDate.getTime()));
    setPreGammes(data.BetsArray.filter((item) => item.date.toDate().getTime() <= currentDate.getTime()));

    console.log(data.BetsArray[1].date.toDate().getTime());
    const oldBetsArray = data.OldBetsArray || [];
  await updateDoc(docRef, { OldBetsArray: oldBetsArray });
    const promises = data.BetsArray.filter((item) => item.date.toDate().getTime() <= currentDate.getTime()).map((game)=>
    
         updateDoc(docRef, {
        OldBetsArray: arrayUnion(game),
      })
    );  await Promise.all(promises);  
}

useEffect(()=>{
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      
    })

},[])

useEffect(() => {
    if(isInside)
    {
  SortOldBets()
    }


console.log("Hello");
}, [isInside])





    const logInHandel = async () => {
        try {
            const user2 = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            setIsInside(true);
            navigate(-1)
           
        } catch (error) {
            alert("email or password are incorect");

        }
        setIsInside(true);


    };

    const signINHandel = (() => {
        navigate('/SignUp')
    })


    return (
        <div className='col-12 d-flex  justify-content-center'>
            <div className='col-8 d-flex flex-column flex-md-row ' style={{ height: "75vh", marginTop: "10vh" }}>
                <div className='col-md-6 col-12 mt-5 ' >
                    <h1 className='logTit text-warning'>Wellcome to Betim!!!</h1>
                    <span className='logTit' style={{ fontSize: "1.2em", color: "white" }}>
                        our soccer bets web offers a user-friendly
                        interface, a wide variety of betting options, competitive odds, and reliable customer support.
                        It also provides up-to-date information on upcoming matches, teams, and player statistics to help users make
                        informed betting decisions. Overall, ouer website offers a great betting experience for soccer fans.</span>
                </div>
                <div className='col-md-6 col-12 d-flex justify-content-center' >
                    <Form className="d-flex mt-5 align-items-center flex-column">
                        <h2 className='logTit'>Full Name:</h2>
                        <div className='col-12 d-flex justify-content-around'>
                            <Form.Group className="mb-3 col-5 d-flex" controlId="formBasicName">
                                <Form.Label></Form.Label>
                                <Form.Control type="text" placeholder="private name:" />

                            </Form.Group>
                            <Form.Group className="mb-3 col-5  d-flex" controlId="formBasicName">
                                <Form.Label></Form.Label>
                                <Form.Control type="text" placeholder="Famly name:" />
                            </Form.Group>
                        </div>
                        <h2 className='logTit'>Email Adress:</h2>
                        <Form.Group className="mb-3 col-10 d-flex" controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control type="email" placeholder="Enter email:"  onChange={(event) => setLoginEmail(event.target.value)} />

                        </Form.Group>
                        <h2 className='logTit'>Passward:</h2>
                        <Form.Group className="mb-3 col-10 d-flex" controlId="formBasicPassword">
                            <Form.Label></Form.Label>
                            <Form.Control type="password" placeholder="Password:"  onChange={(event) => setLoginPassword(event.target.value)} />
                        </Form.Group>

                        <Button className='mb-3' variant="warning" onClick={logInHandel}>log in </Button>
                        <Button variant="warning" onClick={signINHandel} >Dont Have Account </Button>


                    </Form>

                </div>
            </div>
        </div>
    )
}
