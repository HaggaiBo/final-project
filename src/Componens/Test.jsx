import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react'
import './style.css'

export default function Test() {

  // const currentDate = new Date();
  // const nextGames = {
  //   firstName: "Barcelona",
  //   firstImg: "https://www.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png/tiny",
  //   secName: "Real Madrid",
  //   secImg: "https://www.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png/tiny",
  //   OnWho: '',
  //   odds: 1.234,
  //   sum: 450,
  //   date: currentDate,
  //   won: true
  // }

  // const wImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iV2luIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzNBQTc1NyIgY3g9IjgiIGN5PSI4IiByPSI4Ij48L2NpcmNsZT4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSI2LjQgOS43NiA0LjMyIDcuNjggMy4yIDguOCA2LjQgMTIgMTIuOCA1LjYgMTEuNjggNC40OCI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="

  // const TeamBet = ((item) => {
  //   if (item.OnWho == 'f') return item.firstName;
  //   else if (item.OnWho === 's') return item.secName;
  //   else return (<div style={{ marginLeft: "12px" }}>draw</div>)
  // })


  // return (
  //   <div className='col-12 d-flex' style={{ height: "150vh" }}>
  //     <div className='d-none d-lg-block col-4'></div>
  //     <div className='col-12 col-lg-8'>



  //       <div className=' d-flex flex-column justify-content-center align-items-center' style={{ height: "85vh" }}>
  //         <div className='nextBets' style={{ width: "400px", height: "120px" }}>
  //           <div className='d-flex justify-content-between align-items-center'>
  //             <div ><img alt="club img" className='rounded-circle m-2' src={nextGames.firstImg} width="20" height="20" />{nextGames.firstName}</div>
  //             <div style={{ color: "red" }}>0 : 4</div>
  //             <div><img alt="club img" className='rounded-circle m-2' src={nextGames.secImg} width="20" height="20" />{nextGames.secName}</div>
  //           </div>
  //           <div className="text-center"><img src={wImage} alt="W" className="m-1" /></div>
  //           <div className='d-flex justify-content-between align-items-center'>
  //             <div>{TeamBet(nextGames)}</div>
  //             <div> bet on {nextGames.sum}</div>
  //           </div>
  //           <div className='text-center'>winning:{(nextGames.odds * nextGames.sum)}({nextGames.odds})</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  // );



  return (
    <div>
      <div className='col-12 bg-dark' style={{ height: "10vh" }}>


      </div>
      <div className='col-12 d-flex justify-content-center' style={{ height: "115vh" }}>
        <div className='col-8  d-flex ' style={{ height: "75vh", marginTop: "10vh" }}>
          <div className='col-6 mt-5 ' >
            <h1 className='logTit text-warning'>Wellcome to Betim!!!</h1>
            <h2></h2>
            <span className='logTit' style={{fontSize:"1.2em",color:"white"}}>our soccer bets web offers a user-friendly 
            interface, a wide variety of betting options, competitive odds, and reliable customer support. 
            It also provides up-to-date information on upcoming matches, teams, and player statistics to help users make 
            informed betting decisions. Overall, ouer website offers a great betting experience for soccer fans.</span>
          </div>
          <div className='col-6 d-flex justify-content-center' >
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
                <Form.Control type="email" placeholder="Enter email" />

              </Form.Group>
              <h2 className='logTit'>Passward:</h2>
              <Form.Group className="mb-3 col-10 d-flex" controlId="formBasicPassword">
                <Form.Label></Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button className='mb-3' variant="warning" >log in </Button>
              <Button variant="warning" >Dont Have Account </Button>


            </Form>



          </div>
        </div>
      </div>


    </div>
  )

}





