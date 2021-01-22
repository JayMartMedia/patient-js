import {useState} from 'react';
import PatientTableContainer from './components/table/PatientTableContainer';
import LandingPage from './components/LandingPage';
import Button from './components/buttons/Button';
import buttonClasses from './components/buttons/Button.module.scss';
import classes from './components/LandingPage.module.scss';

function App() {
  const [viewPatients, setViewPatients] = useState(false);

  const onViewPatientsClick = () => {
    setViewPatients(true);
  };

  return (
    <div className="app">
      <img className={classes.backgroundImage} src='/landing.jpeg' />
      { 
        viewPatients ? 
        <PatientTableContainer /> : 
        <>
          <LandingPage>
            <Button 
              className={buttonClasses.button}
              text='View Patients'
              onClick={onViewPatientsClick}
            />
          </LandingPage>
        </>
      }
    </div>
  );
}

export default App;
