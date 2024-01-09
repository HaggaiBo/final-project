import React, { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { DataContext } from '../App';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../Firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Alert } from 'react-bootstrap';
import { useLeague } from './Context';

export default function SignUp() {
  const [firsName, setFirsName] = useState("");
  const [isAlert, setIsAlert] = useState(false)
  const [newEmail, setNewEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useLeague();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => { setUser(currentUser) });
  }, [])

  const feeldsname = { lineHeight: "0.5em", color: "#f5f5f5", fontWeight: "bold", fontStyle: "italic" }

  const register = async () => {
    try {
      setDoc(doc(db, "Users", newEmail.toLowerCase()), {
        money: 2500,
        numberGamesBet: 0,
        gamesOfWin: 0,
        gamesOfLost: 0,
        profit: 0,
        loss: 0,
        firstname: firsName,
        lastName: lastName,
      });
      const user = await createUserWithEmailAndPassword(
        auth,
        newEmail,
        newPassword
      );

      navigate("/login");
    } catch (error) {
      deleteDoc(doc(db, "Users", newEmail));

      alert("Incorrect Details")
    }

  };

  const handelSub = (() => {
    register();
    navigate(-1);

  })
  return (
    <div className='col-12 d-flex flex-column justify-content-center align-items-center' style={{ height: "85vh" }}>
      <h1 style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "4em" }}>Sign Up</h1>
      <div className='col-md-4 col-7 d-flex justify-content-center'>
        <Form className="d-flex mt-5 align-items-center flex-column text-start text-light">
          <div className='col-12 d-flex justify-content-around'>
            <Form.Group className="mb-3 col-5 feeldsname" controlId="formBasicName" >
              <Form.Label> Full Name:</Form.Label>
              <Form.Control type="text" placeholder="private name:" onChange={(event) => setFirsName(event.target.value)} />

            </Form.Group>
            <Form.Group className="mb-3 mt-3 col-5 feeldsname" controlId="formBasicName">
              <Form.Control type="text" placeholder="Famly name:" onChange={(event) => setLastName(event.target.value)} />
            </Form.Group>
          </div>
          <Form.Group className="mb-3 col-10 feeldsname" controlId="formBasicEmail">
            <Form.Label> Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email:" onChange={(event) => setNewEmail(event.target.value)} />

          </Form.Group>
          <Form.Group className="mb-3 col-10 feeldsname" controlId="formBasicPassword">
            <Form.Label>password:</Form.Label>
            <Form.Control type="password" placeholder="Password:" Onchecked onChange={(event) => setNewPassword(event.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 col-10 feeldsname " controlId="formBasicPassword">
            <Form.Label>Birthday :</Form.Label>
            <Form.Control type="date" />
          </Form.Group  >
          <span className='feeldsname text-start col-10 mb-2'>Gender:</span>
          <div className='col-10 d-flex  justify-content-around'>
            <div><input type="radio" value="Male" name="gender" />Male</div>
            <div><input type="radio" value="Female" name="gender" /> Female</div>
            <div><input type="radio" value="Other" name="gender" /> Other</div>
          </div>
          <Button className='btn btn-dark mt-3' onClick={handelSub}>sign up</Button>


        </Form>

      </div>



    </div>
  )
}
