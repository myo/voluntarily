import { HomePage } from './pages/HomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { LoginPage } from './pages/LoginPage';
import Loading from './components/Loading';
import { useAppContext } from './context/AppContext';
import { ActionType } from './context/AppTypes';
import { CreateProfilePage } from './pages/CreateProfilePage';

function App() {
  const appCtx = useAppContext();

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
          <Route path="/members">
            <Route path="create-profile" element={<CreateProfilePage/>}/>
          </Route>
          <Route path="/register" element={<RegistrationPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
