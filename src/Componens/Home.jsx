import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import {  Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiArrowRight } from "react-icons/hi"
import { useLeague } from './Context'
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { DataContext } from "../App";



export default function Home() {
    const mainTextStyle = {
        textShadow: "12px 0px 7px rgba(0,0,0,0.7)",
        fontFamily: "Times New Roman",
    };
    const text = "Hello guest,wellcome to Betim a football bets platform. choose your league and start to bet!!";
    const [displayText, setDisplayText] = useState("");
    const [currentLetter, setCurrentLetter] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [holder, setHolder] = useState("Player Name");
    const { setPlayername } = useLeague();
    const {user} =useLeague()

    

    const handleSearch = () => {
        setPlayername(searchValue);
        setSearchValue("")
        //console.log(searchValue);
    };

    const handleInputChange = (event) => { setSearchValue(event.target.value); }


    return (
        <div>
            <div className="col-12 " style={{ height: "85vh" }}>
                <div className="col-12 p-5 mt-2 ">
                    <div className="d-flex flex-column span1Home " >
                        <span style={{ lineHeight: "0.9em" }} >MAXIMIZE</span>
                        <span style={{ lineHeight: "0.9em" }}>YOUR FULL</span>
                        <span style={{ lineHeight: "0.9em" }}>SELF-BET.</span>
                    </div>
                    <div className="d-flex flex-column p-2 span2Home">
                        <span style={{ lineHeight: "0.9em" }}>Find & explore the best odds in the</span>
                        <span style={{ lineHeight: "0.9em" }}> best leagues aroud the world.</span>
                    </div>
                    <div className=" col-6 d-flex justify-content-center align-items-center" style={{ height: "150px", color: "white" }}>
                        <div className="d-flex">
                            <Link to={user?"/PersonalArea" : "/LogIn"}style={{ color: 'black', textDecoration: 'none' }}>
                                <div className="paButton d-flex justify-content-around align-items-center">YOUR AREA</div>
                            </Link>
                            <div className="arrowBox d-flex justify-content-around align-items-center"><HiArrowRight /> </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex" style={{ height: "80vh", backgroundColor: "#5a363a", color: "white" }}>
                    <div className="col-5 d-flex flex-column justify-content-center align-items-center" style={{ height: "100%" }}>
                        <span className="border-bottom border-white" style={{ fontSize: "3em" }} >OVER</span>
                        <h5 className="col-5" style={{ fontStyle: "italic" }}>more than 20 leagues with the best player are waiting for you to be explored.</h5>
                        <div className="d-flex">
                            <Link to="/Leagues" style={{ color: 'black', textDecoration: 'none', fontWeight: "bold" }}>
                                <div className="lButton d-flex justify-content-around align-items-center">VIEW ALL</div>
                            </Link>

                        </div>
                    </div>
                    <div className="col-7  leftHomeLegue"></div>
                </div>
                <div className="col-12 d-flex " style={{ height: "87vh", color: "white", backgroundColor: "#2D2E2D" }}>
                    <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                        <Link to="/News" style={{ textDecoration: "none", color: "white" }}>
                            <div className=" newsHome d-flex flex-column justify-content-center align-items-center">
                                <h2 className="border-bottom">TOP NEWS</h2>
                                <span className="col-7">Come chack tha last news and the last transitions update all around the football world.</span>
                                <img
                                    alt="England"
                                    className="rounded-circle m-2"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgV9Z46uWTq3auQaHhFjkfZEZcZJfLxerJzMqPwY2yRAeZRPcmqE3hilc7dOVHqbVIYY&usqp=CAU"
                                    width="150"
                                    height="150"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                        <Link to="/Videos" style={{ textDecoration: "none", color: "white" }}>
                            <div className="newsHome d-flex flex-column justify-content-center align-items-center">
                                <h2 className="border-bottom">TOP VIDEOS</h2>
                                <span className="col-7">Watch all Goals & highlights of the last games from the best soccer leagues.</span>
                                <img
                                    alt="England"
                                    className="rounded-circle m-2"
                                    src="https://icons-for-free.com/iconfiles/png/512/play+video+icon-1320087276811937902.png"
                                    width="150"
                                    height="150"
                                />
                            </div>
                        </Link>
                    </div>

                </div>
              
                    <div className="d-flex flex-md-row flex-column">
                        <div className="col-md-7 col-12 lastHome" style={{ height: "80vh" }}></div>
                        <div className="col-md-5 d col-12 d-flex flex-column justify-content-center align-items-center text-light" style={{ height: "80vh"}}>
                            <h1 className="border-bottom">Search</h1>
                            <span className="col-5">faind all the data you need to knoe about your favorite players</span>

                            <Form className="d-flex flex-column justify-content-center align-items-center" style={{ margin: "10px" }}>
                                <Form.Control
                                    type="search"
                                    placeholder={holder}
                                    value={searchValue}
                                    className="me-2 mb-2 mt-3"
                                    aria-label="Search"
                                    onChange={handleInputChange}
                                />
                                <Link to="/playerName" myVariable={searchValue} onClick={handleSearch}>
                                    <Button variant="outline-warning" >Search </Button>
                                </Link>

                            </Form>
                        </div>
                        
                    </div>
             





            </div>
        </div>
    );
}

{/* <div className="col-12" style={{ height: "85vh" }}>
 
    <div className="d-md-flex flex-column flex-md-row col-12 p-5 justify-content-evenly leave-space">
        <h1
            className="text-light fw-bold col-md-5 col-12 p-md-5 d-flex align-items-center"
            style={mainTextStyle}
        >
            {displayText}
        </h1>
        <div className="d-flex col-md-6 justify-content-center align-items-center">
            <Lottie
                animationData={animationData}
                loop={true}
                style={{ height: "200px" }}
            />
        </div>
    </div>
   
  
</div>

<div className="col-12 bg-danger leaguAtHome" style={{height:"70vh"}}> </div> */}

//useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         if (currentLetter >= text.length) {
    //             clearInterval(intervalId);
    //             return;
    //         }
    //         setDisplayText(displayText + text[currentLetter]);
    //         setCurrentLetter(currentLetter + 1);
    //     }, 80);
    //     return () => clearInterval(intervalId);
    // }, [currentLetter, text]);