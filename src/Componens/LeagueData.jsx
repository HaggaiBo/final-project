import React, { useRef, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Table, Form, Alert } from "react-bootstrap";
import Lottie from "lottie-react";
import loaderAnimation from "./animation/LoaderAnimation.json";
import { useLeague } from "./Context";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Country() {
  const LeagueID = useParams().LeagueID;
  const [league, setLeague] = useState([]);
  const [loadingg, setLoadingg] = useState(true);
  const [teamsIndex, setTeamsIndex] = useState(-1);
  const [leagueName, setLeagueName] = useState("");
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);
  const [half, setHalf] = useState();
  const [selectedOdd, setSelectedOdd] = useState(null);
  const [tempdelay, setTempdelay] = useState(false);
  const targetRef = useRef(null);
  const wImage =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iV2luIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzNBQTc1NyIgY3g9IjgiIGN5PSI4IiByPSI4Ij48L2NpcmNsZT4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSI2LjQgOS43NiA0LjMyIDcuNjggMy4yIDguOCA2LjQgMTIgMTIuOCA1LjYgMTEuNjggNC40OCI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==";
  const LImage =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTG9zcyI+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiNFQTQzMzUiIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgOC4wMDAwMDApIHJvdGF0ZSgtMzE1LjAwMDAwMCkgdHJhbnNsYXRlKC04LjAwMDAwMCwgLTguMDAwMDAwKSAiIHBvaW50cz0iMTIgOC44IDguOCA4LjggOC44IDEyIDcuMiAxMiA3LjIgOC44IDQgOC44IDQgNy4yIDcuMiA3LjIgNy4yIDQgOC44IDQgOC44IDcuMiAxMiA3LjIiPjwvcG9seWdvbj4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=";
  const DImage =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRHJhdyI+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiM5QUEwQTYiIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjUgNyAxMSA3IDExIDkgNSA5Ij48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K";
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const [selectDate, setSelectDate] = useState(currentDate);
  const month = currentDate.getMonth() + 1; // add 1 to get 1-based month index
  const day = currentDate.getDate();
  const [error, setError] = useState("");
  let changeDay = day - 2;

  //************** Fire Base *************//

  const { user, setUser } = useLeague();
  const [myBet, setMyBet] = useState(0);
  const [src1, setSrc1] = useState("");
  const [src2, setSrc2] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [onWho, setOnWho] = useState("");
  const [odds, setOdds] = useState(0);
  const [win, setWin] = useState(false);
  const [date, setDate] = useState(currentDate);
  const [userMoney, setUserMoney] = useState();
  const PrivateUser = doc(db, "Users", `${user?.email}`);

  const line = {
    borderLeft: "1px solid black",
    height: "70px",
    margin: "0 10px",
  };
  const tinyLine = {
    borderLeft: "1px solid black",
    height: "20px",
    margin: "0 10px",
  };
  const shadow = {
    boxShadow: "0 0 100px rgba(15, 0, 0, 0.99), 0 6px 6px rgba(29, 0, 0, 0.23)",
  };
  const horisonLine = { border: "white 2px solid" };
  const titels = {
    fontSize: "3.2em",
    color: "#e8c061",
    fontWeight: "bold",
    fontStyle: " italic",
  };

  const getData = async () => {
    const docRef = await doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    console.log(docSnap);
    setUserMoney(data.money);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getData();
      }
    });
  }, []);

  setTimeout(() => {
    setLoadingg(false);
  }, 2080);

  useEffect(() => {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${LeagueID}&s=2023-2024`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLeague(data.table);
        console.log(data.table);
        console.log("1234");
        setHalf(data.table.length / 2);
        const temp = data.table.length / 2;
        setFirstHalf(data.table.slice(0, temp));
        setSecondHalf(data.table.slice(temp));
        setLeagueName(data.table[0].strLeague);
      })
      .catch((error) => console.error(error));
  }, []);

  const clickMatch = (index, date) => {
    setTeamsIndex(index);
    console.log(date);
    setSelectDate(date);
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const teamspics = league.map((team) => {
    return (
      <div className="m-2">
        <img
          alt="club img"
          src={team.strTeamBadge.slice(0, -5)}
          width="130"
          height="130"
        />
      </div>
    );
  });

  const leageTable = league.map((team, index) => {
    return (
      <tr key={team.idTeam}>
        <td>{team.intRank}</td>

        <td>
          {
            <img
              alt="club img"
              className="rounded-circle m-2"
              src={team.strTeamBadge}
              width="20"
              height="20"
            />
          }
          {team.strTeam}{" "}
        </td>

        <td>{team.intPoints}</td>
        <td>{team.intPlayed}</td>
        <td>{team.intWin}</td>
        <td>{team.intDraw}</td>
        <td>{team.intLoss}</td>
        <td>{team.intGoalsFor}</td>
        <td>{team.intGoalsAgainst}</td>
        <td>{team.intGoalDifference}</td>
      </tr>
    );
  });

  const games = firstHalf.map((item, index) => {
    if (index % 2 == 0) {
      changeDay += 2;
    }
    const date = new Date(currentDate.getFullYear(), month - 1, changeDay);
    date.setHours(index + 12);
    date.setMinutes(index % 2 == 0 ? 30 : 45);
    const weekday = date.getDay();
    return (
      <div className="match m-2 d-flex align-items-center justify-content-between rounded-2 col-12 col-md-5">
        <div
          className="d-flex flex-column justify-content-center col-7"
          onClick={() => clickMatch(index, date)}
        >
          <div>
            <img
              alt="club img"
              className="rounded-circle m-2"
              src={item.strTeamBadge}
              width="20"
              height="20"
            />
            {item.strTeam}
          </div>
          <div>
            <img
              alt="club img"
              className="rounded-circle m-2"
              src={secondHalf[index].strTeamBadge}
              width="20"
              height="20"
            />
            {secondHalf[index].strTeam}
          </div>
        </div>
        <div style={line}></div>
        <div className="col-3">
          <div className="text-center">{`${changeDay
            .toString()
            .padStart(2, "0")}-${month.toString().padStart(2, "0")}`}</div>
          <div className="text-center">{daysOfWeek[weekday]}</div>
        </div>
      </div>
    );
  });

  const betTeams = (index) => {
    if (index < half && src1 != league[index].strTeamBadge.slice(0, -5)) {
      setSrc1(league[index].strTeamBadge.slice(0, -5));
      setSrc2(league[index + half].strTeamBadge.slice(0, -5));
      setName1(league[index].strTeam);
      setName2(league[index + half].strTeam);
      setDate(selectDate);
    }

    return (
      <div className="col-3 rounded-2 p-3 d-flex flex-column align-items-center">
        <div className="d-flex justify-content-center align-items-center vh-100 ">
          <img
            alt="club img"
            className=" m-2"
            src={league[index].strTeamBadge.slice(0, -5)}
            width="90"
            height="90"
          />
          <h3>{league[index].strTeam}</h3>
        </div>
        <div>
          {league[index].strForm.split("").map((char) => {
            {
              switch (char) {
                case "W":
                  return <img src={wImage} alt="W" className="m-1" />;
                case "L":
                  return <img src={LImage} alt="L" className="m-1" />;
                case "D":
                  return <img src={DImage} alt="D" className="m-1" />;
                default:
                  return null;
              }
            }
          })}
        </div>
      </div>
    );
  };

  const oddsGame = (index) => {
    let r = LeagueID / 1000 - index / 1.524;
    if (r < 0) {
      r = r * -1;
    }
    if (r < 2) {
      r = r + 1.654;
    }
    let l = r / 1.75;
    let m = r + l * 0.2 - 1;

    return (
      <div className="d-flex">
        <div
          className={selectedOdd === 1 ? "selected oddBox" : "oddBox"}
          onClick={() => oddsClick(1, l)}
        >
          {l.toFixed(2)}{" "}
        </div>
        <div style={tinyLine}></div>
        <div
          className={selectedOdd === 2 ? "selected oddBox" : "oddBox"}
          onClick={() => oddsClick(2, m)}
        >
          {m.toFixed(2)}{" "}
        </div>
        <div style={tinyLine}></div>
        <div
          className={selectedOdd === 3 ? "selected oddBox" : "oddBox"}
          onClick={() => oddsClick(3, r)}
        >
          {r.toFixed(2)}{" "}
        </div>
      </div>
    );
  };

  const oddsClick = (oddNumber, odd) => {
    if (oddNumber === selectedOdd) {
      setSelectedOdd(null);
      console.log(user);
    } else {
      setSelectedOdd(oddNumber);
    }
    if (onWho != oddNumber) {
      setOnWho(oddNumber);
      setOdds(odd);
      const randomNumber = Math.floor(Math.random() * 3);
      if (randomNumber == 1) {
        setWin(true);
      }
    }
  };

  const SavingABet = async () => {
    const newBet = {
      mybet: myBet,
      src1: src1,
      src2: src2,
      name1: name1,
      name2: name2,
      onWho: onWho,
      odds: odds,
      win: win,
      date: date,
      calc:false
    };
    console.log(newBet);
    console.log(user);
    await updateDoc(PrivateUser, {
      BetsArray: arrayUnion(newBet),
      money: userMoney - myBet,
    });
    console.log("happen!");
  };
  const subHandel = () => {
    console.log(PrivateUser);
    if (myBet == 0 || odds == 0) {
      alert("missing deatels");
      return;
    }

    // else if (date < currentDate) {
    //   alert('Game Pass')
    //   return;
    // }
    else if (userMoney - myBet < 0) {
      alert("not enough money");
      return;
    }

    SavingABet();
    alert("sucess bet");
  };

  return (
    <div>
      {loadingg ? (
        <div
          style={{ height: "85vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Lottie
            animationData={loaderAnimation}
            loop={true}
            style={{ height: "200px" }}
          />
        </div>
      ) : (
        <div className="text-light">
          {error && <Alert variant="danger">{error}</Alert>}
          <div
            className="col-12 text-center mt-5 v"
            style={{ marginBottom: "200px" }}
          >
            <h1 style={titels}>
              {leagueName.toUpperCase()}
              <br></br>MATCH DAY {league[0].intPlayed}
            </h1>
          </div>
          <div className="col-6 ">
            <div
              className="text-end"
              style={{
                fontSize: "2.5em",
                lineHeight: "1em",
                fontWeight: "bold",
                fontStyle: " italic",
              }}
            >
              TABLE{" "}
            </div>
            <div className="col-12 mb-5" style={horisonLine}></div>
          </div>

          <div
            className="d-flex justify-content-center col-12 test"
            style={{ bxackgroundColor: "#5a363a" }}
          >
            <div className="col-md-7 col-12">
              <Table variant="" className="table-dark">
                <thead>
                  <tr>
                    <th>P</th>
                    <th>Club</th> <th>Pts</th> <th>MP</th> <th>Win</th>{" "}
                    <th>Draw</th> <th>Lost</th> <th>GF</th> <th>GA</th>
                    <th>GD</th>
                  </tr>
                </thead>
                <tbody className="text-dark">{leageTable}</tbody>
              </Table>
            </div>
          </div>

          <div className="col-12 d-flex">
            <div className="col-6"></div>
            <div className="d-flex flex-column col-6">
              <div
                className="text-start mt-5"
                style={{
                  fontSize: "2.5em",
                  lineHeight: "1em",
                  fontWeight: "bold",
                  fontStyle: " italic",
                }}
              >
                GAMES{" "}
              </div>
              <div className="col-12 mb-5" style={horisonLine}></div>
            </div>
          </div>
          <div className="d-flex col-12 flex-column align-items-center">
            <div className="col-lg-7 col-12 d-flex flex-column p-lg-3 mt-lg-3 p-5">
              <div className=" d-flex justify-content-center order align-items-center align-self flex-wrap">
                {games}
              </div>
            </div>
          </div>
          {teamsIndex > -1 && (
            <div
              ref={targetRef}
              className="col-12 bet d-flex align-items-center justify-content-center mb-5 mt-5"
              style={{ fontFamily: " Georgia, serif" }}
            >
              <div
                className="d-flex rounded-2 box1 col-lg-10 col-11"
                style={{ height: "200px", color: "white" }}
              >
                {betTeams(teamsIndex)}
                <div className="col-6 d-flex flex-column justify-content-around align-items-center">
                  <h4 className="gamedate">
                    {selectDate
                      .toDateString()
                      .substring(0, selectDate.toDateString().length - 4)}{" "}
                    {selectDate.getHours()}:{selectDate.getMinutes()}
                  </h4>
                  <div className="odds">{oddsGame(teamsIndex)}</div>
                  <Form className="d-flex ">
                    <Form.Control
                      min="1"
                      type="number"
                      placeholder="put your bet here"
                      className="me-2"
                      aria-label="Search"
                      onChange={(event) => setMyBet(event.target.value)}
                    />
                    <Button
                      className="btn-outline-light btn btn-dark"
                      style={shadow}
                      onClick={() => {
                        subHandel();
                      }}
                    >
                      {" "}
                      bet
                    </Button>
                  </Form>{" "}
                </div>
                {betTeams(teamsIndex + half)}
              </div>
            </div>
          )}
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="col-10 mt-5 border-top d-flex justify-content-center flex-wrap">
              {teamspics}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
