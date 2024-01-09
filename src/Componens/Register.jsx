import { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { DataContext } from "../App1";

export default function Register() {
  // const [newName , setNewName] = useState("");
  // const [newAge , setNewAge] = useState(0);
  // const [myMoney, setMyMoney] = useState(200);

  // const [users , setUsers] = useState([]);
  // const usersCollectionRef = collection(db, "users");

  // const createUser = async () => {
  //   await addDoc(usersCollectionRef, {
  //     name: newName,
  //     age: newAge,
  //     MyMoney: myMoney

  //   })
  // }

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  //   };

  //   getUsers();
  // })

  //   return (
  //     <div className="App">

  //       <input placeholder="Name"
  //       onChange={(event) => {
  //         setNewName(event.target.value)}}>
  //       </input>

  //       <input type = "number" placeholder="Age"
  //       onChange={(event) => {
  //         setNewAge(event.target.value)}}>
  //       </input>

  //      <button onClick={createUser}>Sign Up</button>

  //       {users.map((user) => {
  //         return <div>
  //           <h1> Name: {user.name}</h1>
  //           <h1> Age: {user.age}</h1>
  //           <h1> MyMoney: {user.MyMoney}</h1>
  //           </div>
  //         })}
  //     </div>
  //   )

  const { user, setUser } = useContext(DataContext);
  const usersCollectionRef = collection(db, "users");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  console.log(user);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  //const [newAge , setNewAge] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      setDoc(doc(db, "users", newEmail), {
        data: [],
      });
      const user = await createUserWithEmailAndPassword(
        auth,
        newEmail,
        newPassword
      );
      user.user.displayName = newName;
      console.log(user);
      navigate("/login");
    } catch (error) {
      deleteDoc(doc(db, "users", newEmail));
      alert("Incorrect Details");
    }
  };

  return (
    <div className=" text-center mt-5 ">
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-fold mb-2"
        >
          Email
        </label>
        <input
          value={newEmail}
          placeholder="youremail@company.ltd"
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-fold mb-2"
        >
          Password
        </label>
        <input
          placeholder="*******"
          value={newPassword}
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-fold mb-2"
        >
          Name
        </label>
        <input
          placeholder="Enter your name"
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center col-12">
        <button
          className="btn btn-lg btn-primary btn-block col-1 m-2"
          onClick={register}
        >
          Register
        </button>
      </div>
    </div>
  );
}
