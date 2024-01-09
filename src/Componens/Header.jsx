import { Navbar, Nav, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { useLeague } from './Context'
import logIN from '../imgs/logIN.png'
import logOut from '../imgs/logOut.png'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from "../Firebase"
import { doc, getDoc } from "firebase/firestore";




function NavBar() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [holder, setHolder] = useState("Player Name");
  const { setPlayername } = useLeague();
  const imgURL = "https://e7.pngegg.com/pngimages/308/217/png-clipart-logo-football-graphy-football-emblem-label.png"
  const [userName, setUserName] = useState("")
  const { user } = useLeague();




 
  
  useEffect(() => {
    if (user) {
      const getData = async () => {
        const docRef = await doc(db, "Users", user.email);
        const docSnap = await getDoc(docRef);
    
        console.log(docSnap.data().firstname);
        setUserName(docSnap.data().firstname + " " + docSnap.data().lastName)
      }
      getData()

    }
  }, [user])

  const LogINHandel = (() => {
    navigate('/LogIn')
  })

  const LogOutHandel=(()=>{
     signOut(auth);
     navigate("/")
    
  })


  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" expanded={expanded}>
      <Navbar.Brand ><div style={{ marginLeft: "20px", fontFamily: 'Brush Script MT', color: "#e8c061" }}><h2 >BETIM</h2></div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto my-2 my-lg-0">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/Leagues">Leagues</Nav.Link>
          {/* <Nav.Link as={Link} to={`${"2019"}`}>competition</Nav.Link> */}
          <Nav.Link as={Link} to="/Videos">Videos</Nav.Link>
          <Nav.Link as={Link} to="/News">News</Nav.Link>
          <Nav.Link as={Link} to={user?"/PersonalArea":"/LogIn"}>Personal Area</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          {user && user.email === 'admin@gmail.com' && (
            <Nav.Link as={Link} to="/Admin">Admin</Nav.Link>)}
        </Nav>
        <div>{user ?  <div className='d-flex align-items-center' style={{ marginRight: "30px" }} onClick={LogOutHandel}>
            <h2 className='mt-1 logInHeader'>Log out</h2>
            <img alt="club img" className='rounded-circle m-2' src={logOut} width="25" height="25" />
          </div>

          : <div className='d-flex align-items-center' style={{ marginRight: "30px" }} onClick={LogINHandel}>
            <h2 className='mt-1 logInHeader'>Log in</h2>
            <img alt="club img" className='rounded-circle m-2' src={logIN} width="25" height="25" />
          </div>
        }
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;

//  const handleInputChange = (event) => { setSearchValue(event.target.value); }

//   const handleSearch = () => {
//     setPlayername(searchValue);
//     setSearchValue("")
//     //console.log(searchValue);
//   };