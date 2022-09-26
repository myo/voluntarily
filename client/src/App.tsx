import { HomePage } from './pages/HomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useContext} from "react";
import { NavBar } from './components/NavBar';
import { LoginPage } from './pages/LoginPage';
import Loading from './components/Loading';
import { AppContext } from './context/AppContext';
import { ActionType } from './context/AppTypes';

function App() {
  const appCtx = useContext(AppContext);
  window.addEventListener("load", () => {appCtx.dispatch({type: ActionType.LOADING_COMPLETE})});
  if (appCtx.state.isLoading) {
    return (<Loading text="Loading..." opacity={0}/>)
  }
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegistrationPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
