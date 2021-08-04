import { useEffect, useContext, useState } from 'react'
import {Context as MainContext} from './context/mainContext'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import pages from './pages';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import pHaulAPI from './api/pHaulAPI';

function App() {
  const {setUser, setTrucks} = useContext(MainContext);
  const [logged, setLogged] = useState(false)
  useEffect(() => {
    try {(async() => {
        if(localStorage.email) {
        const {data} = await pHaulAPI.post('/login', {email: localStorage.email});
        setUser(data);
        setLogged(true)
      };
      const {data} = await pHaulAPI('/trucks');
      setTrucks(data)
    })()} catch(e) {
      console.log(e);
    }
    //
  }, [])
  return !logged ? <Landing setLogged={setLogged}/> : (
    <Router>
      <NavBar setLogged={setLogged}/>
      <Route exact path="/" component={pages.Home}/>
      <Route exact path="/trucks/:id" component={pages.TruckShow}/>
      <Route exact path="/reservations" component={pages.Reservations}/>
      <Route path="/reservations/:id" component={pages.ReservationShow}/>
    </Router>
  );
}

export default App;
