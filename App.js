//import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import SmartLighting from './components/SmartLighting';
import Heating from './components/Heating';
import AntiTheft from './components/AntiTheft';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/slight" element={<SmartLighting/>} />
          <Route exact path="/heating" element={<Heating/>} />
          <Route exact path="/antitheft" element={<AntiTheft/>} />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
