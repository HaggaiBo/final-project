// 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


// request for the champions:  https://api.football-data.org/v2/competitions/{leage id}/teams

// request for the team's data:  https://api.football-data.org/v2/teams/{team id}

// England Premier leage id: 2021

// France Ligue 1 id: 2015

// Germany Bundesliga id:2002

// Spain Primera Division(La Liga) id:2014

// Italy Serie A id: 2019

//****************preimre leage table********************************/
// import React, { useState, useEffect } from 'react';
// import 'isomorphic-fetch';

// function PremierLeagueTable() {
//   const [table, setTable] = useState([]);
//   const apiKey = 'your_api_key';
//   const leagueId = 'premier league id';
//   const url = `https://api.fifa.com/api/v1/leagues/${leagueId}/standings`;

//   useEffect(() => {
//     fetch(url, {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': apiKey
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         setTable(data.standings);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Premier League Table</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Position</th>
//             <th>Team</th>
//             <th>Points</th>
//           </tr>
//         </thead>
//         <tbody>
//           {table.map((team, index) => (
//             <tr key={team.team.id}>
//               <td>{index + 1}</td>
//               <td>{team.team.name}</td>
//               <td>{team.points}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PremierLeagueTable;