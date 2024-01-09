import 'react-bootstrap/dist/react-bootstrap.min.js'
import Test from './Componens/Test';
import Home from './Componens/Home';
import { Route, Routes } from 'react-router-dom';
import Header from './Componens/Header';
import { LeagueProvider } from './Componens/Context';
import Country from './Componens/LeagueData';
import Leagues from './Componens/Leagues';
import Videos from './Componens/Videos';
import PLayerDeatels from './Componens/PLayerDeatels';
import PersonalRrea from './Componens/PersonalRrea';
import News from './Componens/News';
import LogInD from './Componens/LogInD';
import SignUp from './Componens/SignUp';
import Admin from './Componens/Admin';



function App() {

  return (
    <div>
      <LeagueProvider>
          <Header />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/Videos' element={<Videos />} />
            <Route path='/LogIn' element={<LogInD />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/News' element={<News />} />
            <Route path='/PersonalArea' element={<PersonalRrea />} />
            <Route path='/:Leagues' element={<Leagues />} />
            <Route path='/playerName' element={<PLayerDeatels />} />
            <Route path='/Admin' element={<Admin/>}/>
            <Route path='/:Leagues/:LeagueID' element={<Country />} />
          </Routes>
      </LeagueProvider>
    </div>
  );
}

export default App;
