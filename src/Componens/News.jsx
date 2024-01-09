import React from 'react'

export default function News() {



const ScoreBatEmbed = (()=> {
  return (
    <div style={{ width: '100%', height: '30px', position: 'relative', paddingBottom: 'calc(56.25% + 335px)' }} className='_scorebatEmbeddedPlayerW_'>
      <iframe src='https://www.scorebat.com/embed/g/1197842/?utm_source=api&utm_medium=match&utm_campaign=dflt' frameborder='0' width='560' height='650' allowFullScreen allow='autoplay; fullscreen' style={{ width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }} className='_scorebatEmbeddedPlayer_' />
    </div>
  );
}) 


  return (

    <div className='col-12 text-center text-light' style={{height:"90vh"}}>
      <h1>NEWS</h1>
      <h3>corrently in future development</h3>
      {ScoreBatEmbed}
    </div>
    
  )
}
