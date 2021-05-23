import './App.css';
import NavBar from './components/Navbar'
import Home from './components/Home'
import AboutView from './components/AboutView'



function App() {
  return (
    <div className="App">
      <NavBar/>
      <Home/>
      <AboutView/>
    </div>
  );
}

export default App;
