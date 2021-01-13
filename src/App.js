import {useState} from 'react';
import PatientTableContainer from './components/table/PatientTableContainer';
import Button from './components/buttons/Button';
import {Rest} from './utility/rest';

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
          text='View Patients'
          onClick={onViewPatientsClick}
        />
      }
    </div>
  );
}

export default App;
