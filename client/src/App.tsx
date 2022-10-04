import { HomePage } from './pages/HomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { LoginPage } from './pages/LoginPage';
import Loading from './components/Loading';
import { useAppContext } from './context/AppContext';
import { ActionType } from './context/AppTypes';
import { CreateProfilePage } from './pages/CreateProfilePage';
import { UploadPortraitPage } from './pages/UploadPortraitPage';
import { appStrings } from './i18n';
import { UserMenu } from './components/UserMenu';

function App() {
  const appCtx = useAppContext();

  window.addEventListener("load", () => {appCtx.dispatch({type: ActionType.LOADING_COMPLETE})});

  if (appCtx.state.isLoading) {
    return (<Loading text={appStrings.loading} opacity={0}/>)
  }

  return (
    <div className="App">
      <Router>
        <NavBar/>
        <UserMenu/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/members">
            <Route path="create-profile" element={<CreateProfilePage/>}/>
            <Route path="upload-portrait" element={<UploadPortraitPage/>}/>
          </Route>
          <Route path="/register" element={<RegistrationPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
