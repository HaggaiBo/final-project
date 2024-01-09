import React from 'react'
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Loader2 from "./animation/Loader2.json";
import { useLeague } from './Context';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from "../Firebase"
import { doc, getDoc } from "firebase/firestore";




export default function PersonalRrea() {
    const currentDate = new Date();
    const [allBets,setAllBets]=useState([]);
    const {user} =useLeague()
    const mainTitel = { color: "#e8c061", textDecoration: "underline", fontWeight: "bold", fontStyle: " italic", marginBottom: "200px", paddingTop: "260px", fontSize: "4em", fontFamily: "Coronet script" };
    const classForData = "col-12 col-lg-4 d-flex flex-column align-items-center justify-content-center paData";
    const styleForData = { height: "80vh", fontSize: "1em", fontStyle: " italic", fontWeight: "bold", color: "white " }
    const [loadingg, setLoadingg] = useState(true);
    const [userName, setUserName] = useState("")
    const [nextGames,setNextGammes]=useState([])
    const [preGames,setPreGammes]=useState([])
    const [allData,setAllData]=useState({})
        
    const TeamBet = ((item) => {
        if (item.onWho == 1) return item.name1;
        else if (item.onWho == 3) return item.name2;
        else return (<div style={{ marginLeft: "12px" }}>draw</div>)
    })
    
  
 
useEffect(()=>{
    for (let index = 0; index < preGames.length; index++) {
        if(!preGames[index].calc){
            //console.log("calc is false");
            if(preGames[index].win){
                allData.money+=Math.round(preGames[index].mybet*preGames[index].odds)
                allData.gamesOfWin++
                allData.profit+=Math.round(preGames[index].mybet*preGames[index].odds)                    
            }
            else
            {
                allData.money-=preGames[index].mybet
                allData.gamesOfLost++
                allData.loss+=preGames[index].mybet                        
            }
        }
        preGames[index].calc=true
        allData.numberGamesBet++            
    }

    console.log(typeof(allData.gamesOfLost));

},[allData])

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            getData();
            console.log(currentUser);
            console.log(user);
          }
        });
        return () => {
          unsubscribe();
        };
      }, []);


    const getData = async () => {
        const docRef = await doc(db, "Users", user.email);
        const docSnap = await getDoc(docRef);
        const data =await docSnap.data();
        setAllData(data)
        console.log(allData);
        setUserName(docSnap.data().firstname + " " + docSnap.data().lastName)
        setNextGammes(data.BetsArray.filter((item) => item.date.toDate().getTime() > currentDate.getTime()))
        setPreGammes(data.BetsArray.filter((item) => item.date.toDate().getTime() < currentDate.getTime()))   
        console.log("done");
        
    }


    
    

    const nextGamesDis =nextGames.map((item) => {
        const tempDate=item.date.toDate()
        return (
            
            <div className='nextBets mb-5' style={{ width: "400px", height: "120px" }}>
                <div className='d-flex justify-content-between align-items-center'>
                    <div ><img alt="club img" className='rounded-circle m-2' src={item.src1} width="20" height="20" />{item.name1}</div>
                    <div style={{ color: "red" }}>VS</div>
                    <div><img alt="club img" className='rounded-circle m-2' src={item.src2} width="20" height="20" />{item.name2}</div>
                </div>
                <div className="text-center">{tempDate.toDateString().substring(0, tempDate.toDateString().length - 4)} {tempDate.getHours()}:{tempDate.getMinutes()}</div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>{TeamBet(item)}</div>
                    <div> bet on {item.mybet}</div>
                </div>
                <div className='text-center'>winning:{(item.odds * item.mybet).toFixed(2)}({item.odds.toFixed(2)})</div>
            </div>
        )
    })

    const preGamesDis =preGames.map((item) => {
        const tempDate=item.date.toDate()
        return (
            
            <div className='nextBets mb-5' style={{ width: "400px", height: "120px" }}>
                <div className='d-flex justify-content-between align-items-center'>
                    <div ><img alt="club img" className='rounded-circle m-2' src={item.src1} width="20" height="20" />{item.name1}</div>
                    <div style={{ color: "red" }}>VS</div>
                    <div><img alt="club img" className='rounded-circle m-2' src={item.src2} width="20" height="20" />{item.name2}</div>
                </div>
                <div className="text-center">{tempDate.toDateString().substring(0, tempDate.toDateString().length - 4)} {tempDate.getHours()}:{tempDate.getMinutes()}</div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>{TeamBet(item)}</div>
                    <div> bet on {item.mybet}</div>
                </div>
                <div className='text-center'>winning:{(item.odds * item.mybet).toFixed(2)}({item.odds.toFixed(2)})</div>
            </div>
        )
    })




    setTimeout(() => {
        setLoadingg(false);
    }, 1800);


    return (
        <div >

            <div className='col-12 text-center  ' style={mainTitel}>Welcome Back {userName? userName:"No name"}</div>
            <div className='col-12 po d-flex  flex-column flex-lg-row' style={{ color: "white", backgroundColor: "#5a363a" }}>

                <div className={classForData} style={styleForData}>
                    {loadingg ? <Lottie animationData={Loader2} loop={true} style={{ height: "200px" }} /> :
                        <div>
                            <h2 className='text-center border-bottom'>COINS</h2>
                            <ul>
                                <li>Total: {allData.money} coins.</li>
                                <li>Lose: {allData.loss} coins.</li>
                                <li>profit: {allData.profit} coins.</li>
                            </ul>
                        </div>}
                </div>

                <div className={classForData} style={styleForData}>{loadingg ? <Lottie animationData={Loader2} loop={true} style={{ height: "200px" }} /> :
                    <div>
                        <h2 className='text-center border-bottom'>GAMES</h2>

                        <ul>
                            <li>Games Bet: {allData.numberGamesBet}.</li>
                            <li>Wins: {allData.gamesOfWin} games.</li>
                            <li>Lost: {parseInt(allData.gamesOfLost)} games.</li>
                            <li>Hit luck: {allData.numberGamesBet!=0?(((allData.gamesOfWin / allData.numberGamesBet) * 100).toFixed(3)):0}%.</li>
                        </ul>
                    </div>}

                </div>
                <div className='midPersAre col-12 col-lg-4 ' style={{ height: "80vh" }}></div>
            </div>
            <div className='col-12 paBets d-flex' style={{ height: "150vh" }}>
                <div className='d-none d-lg-block col-4'></div>
                <div className='col-12 col-lg-8'>
                    <div className="nextGames">
                        <h1 className='border-bottom mb-5' style={{ color: "white", marginTop: "20vh" }}>NEXT GAMES</h1>
                        <div className='d-flex flex-wrap justify-content-around'>
                           {nextGames.length>0 ? nextGamesDis:<div>no gamex</div>} 
                            
                        </div>
                    </div>
                    <div className="preGames">
                        <h1 className='border-bottom mb-5' style={{ color: "white", marginTop: "20vh" }}>PRE GAMES</h1>
                        <div className='d-flex flex-wrap justify-content-around'>
                           {preGamesDis.length>0 ? preGamesDis:<div>no gamex</div>} 
             
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
