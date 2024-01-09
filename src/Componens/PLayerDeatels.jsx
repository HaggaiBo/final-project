import React, { useEffect, useState } from 'react'
import { useLeague } from './Context'
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";




export default function PLayerDeatels() {
  const { playername } = useLeague();
  const [playerData, setPlayerData] = useState([]);
  const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playername}`;
  const curDate = new Date();
  const [flag, setFlag] = useState("")
  const facebookurl=`https://www.facebook.com${playername}`

  useEffect(() => {
    if (playername) {
      fetch(url)
        .then(response => response.json())
        .then((data) => {
          console.log(data.player[0]);
          console.log(playername);
          setPlayerData(data.player[0]);
        })
        .catch(error => console.error(error))
    }

  }, [playername]);

  useEffect(() => {
    if (playerData) {
      fetch(`https://restcountries.com/v3.1/name/${playerData.strNationality}`)
        .then(response => response.json())
        .then((data) => {
          console.log(data[0].flags.png);
          setFlag(data[0].flags.png);

        })
        .catch(error => console.error(error))
    }

  }, [playerData]);


  return (
    <div style={{ color: "white" }}>
      {playerData && playerData.strBanner ?
        <div className='d-flex align-items-center justify-content-center'>
          <img
            className="m-2 rounded-2"
            src={playerData.strBanner}
            width="1200"
            height="200"
          />
        </div> : null
      }
      <div className="disPlayer d-flex flex-column align-items-center">
        <div className="flex-row">
          <img alt="pic" className=" m-2" src={playerData.strCutout} width="400" height="400" />
        </div>

        <h1 style={{ fontFamily: "Aharoni" }}>{playerData.strPlayer} {playerData.strNumber}</h1>
      </div>

      <div className="PData d-flex flex-column flex-md-row justify-content-start p-5 col-12" style={{ fontFamily: "Century Gothic" }}>
        <div className="leftPData justify-content-md-start col-md-6">

          <h3 className='mt-4'>Gender: {playerData.strGender === "Male" ? <BsGenderMale /> : <BsGenderFemale />}</h3>
          {playerData && playerData.dateBorn ?
            <h3 className='mt-4'>Age: {curDate.getFullYear() - playerData.dateBorn.slice(0, 4)} years</h3> : null
          }
          {playerData && playerData.strHeight ?
            <h3 className='mt-4'>Heighit: {playerData.strHeight.slice(0, 4)} M</h3> : null}

          <h3 className='mt-4'>Position: {playerData.strPosition}</h3>
          <h3 className='mt-4'>Current Team: {playerData.strTeam}</h3>
          <h3 className='mt-4'>Birth Location: {playerData.strBirthLocation}</h3>
        </div>
        <div className="rightPData m4 col-md-5 d-flex flex-column text-center align-items-center justify-content-center ">
          <img alt="flag" className="rounded-2" src={flag} width="350" height="250" />
          <h2 style={{fontFamily:"Brush Script MT",color:""}}>{playerData.strNationality}</h2>
        </div>

      </div>
      <div className='col-12 p-4' style={{ fontFamily: "Lucida Sans" }}>
        <div className='col-12'><h3>Desscription:</h3> <span> {playerData && playerData.strDescriptionEN ?
          <span >{playerData.strDescriptionEN.slice(0, 1020)}</span> : null}</span>
        </div>
        <div className='d-flex justify-content-around'><a href={playerData && playerData.strInstagram ? playerData.strInstagram : "https://www.instagram.com/realmadrid"}>
          <img
            className="m-2 rounded-2"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/800px-Instagram-Icon.png"
            width="50"
            height="50"
          />
        </a>
          <a href={playerData && playerData.strFacebook ? playerData.strFacebook :facebookurl}>
            <img
              className="m-2"
              src="https://www.facebook.com/images/fb_icon_325x325.png"
              width="50"
              height="50"
            />
          </a>
          <a href={playerData && playerData.strTwitter ? playerData.strTwitter : "https://twitter.com/home?lang=en"}>
            <img
              className="m-2 r-2"
              src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
              width="50"
              height="50"
            />
          </a>
        </div>

      </div>

    </div>
  )
}



