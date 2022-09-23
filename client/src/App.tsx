import './App.css';
import { HomePage } from './pages/HomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegistrationPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
