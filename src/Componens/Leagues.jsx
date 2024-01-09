import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import AllLeagues from './AllLeagues';



export default function Leagues() {



    const title = { textAlign: "center", fontFamily: "Lucida Sans", fontSize: "10em" }
    return (
        <div>
            <div className='imgLeagues d-flex flex-column justify-content-center align-items-center col-12'>
                <h1 className='titleleagu' style={title}>THE LEAGUES</h1>
                <div className="border-bottom border-white"></div>
            </div>

            <div className='d-flex flex-column justify-content-center align-items-center col-12'>
                <div className="col-10">
                    
                    <div className=" m-5 d-flex flex-wrap justify-content-around namesInLeagu" style={{ backgroundColor: "#5a363a" }} >
                        <AllLeagues />
                    </div>
                </div>
            </div>
        </div>
    )
}
