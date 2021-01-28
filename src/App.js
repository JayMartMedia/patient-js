import {useState, useEffect} from 'react';
import AuthUtil from './authentication/authenticationUtility';
import PatientTableContainer from './components/table/PatientTableContainer';
import classes from './App.module.scss';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // on initial load, check if user is logged in
  useEffect(() => {
    (async () => {
      const user = await AuthUtil.getCurrentUser()
      const isLoggedIn = !!(user.principal && user.principal.enabled);

      if(!isLoggedIn){
        window.location.href='/login'
      }else{
        setCurrentUser(user);
      }
    })();
  }, [])

  return (
    currentUser && 
    <div className="app">
      <img className={classes.backgroundImage} src='/landing.jpeg' alt="page background"/>
      <PatientTableContainer currentUser={currentUser} />
    </div>
  );
}

export default App;
