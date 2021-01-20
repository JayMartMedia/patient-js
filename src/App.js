import {useState} from 'react';
import PatientTableContainer from './components/table/PatientTableContainer';
import Button from './components/buttons/Button';
import {Rest} from './utility/rest';

import buttonClasses from './components/buttons/Button.module.scss';
import './App.scss';

function App() {
  const [viewPatients, setViewPatients] = useState(false);

  window.Rest = Rest;

  const onViewPatientsClick = () => {
    setViewPatients(true);
  };

  return (
    <div className="app">
      <header className="App-header">
        <h1>Demo Patient Tracker</h1>
      </header>
      { 
        viewPatients ? 
        <PatientTableContainer /> : 
        <Button 
          className={buttonClasses.button}
          text='View Patients'
          onClick={onViewPatientsClick}
        />
      }
    </div>
  );
}

export default App;
